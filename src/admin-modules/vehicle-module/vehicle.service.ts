import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnlyMessageResponse } from 'src/common/types';
import { DATABASE_CONNCECTION } from 'src/infra/mongoose/database.config';
import { ResponseHandler } from 'src/utils/response-handler';
import { VehicleDTO } from './dtos/vehicle.dto';
import { VEHICLE_MODEL, VehicleDocument } from './schemas/vehicle.schema';

@Injectable()
export class VehicleService {

    constructor(@InjectModel(VEHICLE_MODEL, DATABASE_CONNCECTION.APP) private readonly vehicleModel: Model<VehicleDocument>) { }

    async setVehicleAvailability(vehicleAvailabilityDTO: VehicleDTO): OnlyMessageResponse {
        const existingRecord = await this.vehicleModel.findOne();

        // throw new Error('Not Implemented');
        if (existingRecord) {
            // Update the existing record
            const updatedRecord = await this.vehicleModel.findByIdAndUpdate(existingRecord._id, vehicleAvailabilityDTO, { new: true });
            return ResponseHandler.success(updatedRecord, 'Vehicle availability updated successfully', HttpStatus.OK);
        } else {
            // Create a new record
            const newRecord = await this.vehicleModel.create(vehicleAvailabilityDTO);
            return ResponseHandler.success(newRecord, 'Vehicle availability set successfully', HttpStatus.CREATED);
        }
    }

    async getVehicleAvailability() {
        const getRecord = await this.vehicleModel.findOne();

        if (!getRecord) {
            return ResponseHandler.error(null, 'Parking slots availability not set', HttpStatus.NOT_FOUND);
        }

        return ResponseHandler.success(getRecord, 'Parking slots availability set successfully', HttpStatus.OK);
    }

}