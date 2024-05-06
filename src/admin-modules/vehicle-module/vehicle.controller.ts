import { Body, Controller, Get, Post } from '@nestjs/common';
import { VehicleDTO } from './dtos/vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {

    constructor(private vehicleService: VehicleService) { }

    @Post()
    setVehicleAvailability(@Body() vehicleAvailabilityDTO: VehicleDTO) {
        return this.vehicleService.setVehicleAvailability(vehicleAvailabilityDTO);
    }

    @Get()
    getVehicleAvailability() {
        return this.vehicleService.getVehicleAvailability();
    }
}