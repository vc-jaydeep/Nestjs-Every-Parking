import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNCECTION } from 'src/infra/mongoose/database.config';
import { VEHICLE_MODEL, VehicleSchema } from './schemas/vehicle.schema';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

const MODELS = [
    { name: VEHICLE_MODEL, schema: VehicleSchema }
];
@Module({
    imports: [MongooseModule.forFeature(MODELS, DATABASE_CONNCECTION.APP)],
    controllers: [VehicleController],
    providers: [VehicleService],
    exports: [MongooseModule]
})
export class VehicleModule {

}