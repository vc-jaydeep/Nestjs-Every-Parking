import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto);
    }

}