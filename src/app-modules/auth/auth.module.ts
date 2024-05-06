import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNCECTION } from 'src/infra/mongoose/database.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EMAIL_VERIFY_MODEL, EmailVerifySchema } from './schemas/email-verify.schema';
import { USER_MODEL, UserSchema } from './schemas/user.schema';

const MODELS = [
    { name: USER_MODEL, schema: UserSchema },
    { name: EMAIL_VERIFY_MODEL, schema: EmailVerifySchema }
];
@Module({
    imports: [MongooseModule.forFeature(MODELS, DATABASE_CONNCECTION.APP)],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [MongooseModule]
})
export class AuthModule { }