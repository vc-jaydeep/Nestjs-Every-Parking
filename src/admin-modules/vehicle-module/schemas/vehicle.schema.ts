import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
    timestamps: true
})
export class Vehicle {

    @Prop({ required: true })
    bikeAvailability: number;

    @Prop({ required: true })
    carAvailability: number;

}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
export type VehicleDocument = HydratedDocument<Vehicle>;
export const VEHICLE_MODEL = Vehicle.name;