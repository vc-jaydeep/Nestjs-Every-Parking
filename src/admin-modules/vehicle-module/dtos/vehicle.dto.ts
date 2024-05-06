import { IsNotEmpty, IsNumber } from 'class-validator';
import { fieldRequired } from 'src/config/message.config';

export class VehicleDTO {

    @IsNumber()
    @IsNotEmpty({ message: fieldRequired('bike availability') })
    bikeAvailability: number;

    @IsNumber()
    @IsNotEmpty({ message: fieldRequired('car availability') })
    carAvailability: number;
}