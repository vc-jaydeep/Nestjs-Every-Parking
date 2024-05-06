import { Transform } from 'class-transformer';
import { IsAlpha, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Defaults, fieldInvalid, maximumLength, minimumLength, validationMessages } from 'src/config/message.config';

export class CreateUserDto {
    @Transform(({ value }): string => (value as string).trim())
    @IsString()
    @MinLength(2, { message: minimumLength('Name', 2) })
    @MaxLength(50, { message: maximumLength('Name', 50) })
    @IsAlpha('en-US', { message: validationMessages.FIRST_NAME_IS_ALPHA })
    @IsNotEmpty({ message: `Name ${validationMessages.NOT_EMPTY}` })
    name: string;

    @Transform(({ value }): string => (value as string).trim().toLowerCase())
    @IsEmail({}, { message: fieldInvalid('Email') })
    @MaxLength(100, { message: maximumLength('Email', 100) })
    @IsNotEmpty({ message: `Email ${validationMessages.NOT_EMPTY}` })
    email: string;


    @IsNotEmpty({ message: `Phone number ${validationMessages.NOT_EMPTY}` })
    @IsString()
    phoneNunber: string;

    @IsNotEmpty({ message: `Age ${validationMessages.NOT_EMPTY}` })
    @IsNumber()
    age: number;

    @Transform(({ value }): string => (value as string).trim())
    @Matches(Defaults.PASSWORD_REGEX, {
        message: validationMessages.PASSWORD_IS_VALID,
    })
    @MinLength(2, { message: minimumLength('Password', 2) })
    @MaxLength(50, { message: maximumLength('Password', 20) })
    @IsString()
    @IsNotEmpty({ message: `Password ${validationMessages.NOT_EMPTY}` })
    password: string;
}