import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnlyMessageResponse } from 'src/common/types';
import { Defaults, errorMessages, successMessages } from 'src/config/message.config';
import { DATABASE_CONNCECTION } from 'src/infra/mongoose/database.config';
import { ResponseHandler } from 'src/utils/response-handler';
import { CommonService } from '../common/common.service';
import { MailService } from '../common/notification/mail.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { EMAIL_VERIFY_MODEL, EmailVerifyDocument } from './schemas/email-verify.schema';
import { USER_MODEL, UserDocument, UserQueryObject } from './schemas/user.schema';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(USER_MODEL, DATABASE_CONNCECTION.APP) private readonly userModel: Model<UserDocument>,
        @InjectModel(EMAIL_VERIFY_MODEL, DATABASE_CONNCECTION.APP) private readonly emailVerifyModel: Model<EmailVerifyDocument>,
        private readonly commonService: CommonService,
        private readonly commonMailService: MailService
    ) { }

    async createUser(createUserDto: CreateUserDto): OnlyMessageResponse {
        try {
            const adminUserWithEmail = await this.getUserJson({
                email: createUserDto.email,
            });

            if (adminUserWithEmail) throw new BadRequestException(errorMessages.USER_ALREADY_REGISTERED);

            const user = await this.userModel.create(createUserDto);

            await this.sendVerificationEmail(user);

            return ResponseHandler.success([], successMessages.USER_SIGNUP, HttpStatus.OK);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async sendVerificationEmail(user: UserDocument,) {
        const emailVerificationToken = this.commonService.generateToken(12);

        await this.createEmailVerifyToken({
            userId: user._id,
            token: emailVerificationToken,
        });

        const redirectUrl = `${Defaults.EMAIL_VERIFY_URL}${emailVerificationToken}`;;
        await this.commonMailService.sendVerificationEmail({
            name: `${user.name}`,
            email: user.email,
            subject: Defaults.VERIFY_USER_SUBJECT,
            redirectUrl,
        });
    }

    async getUserJson(query: UserQueryObject, select: object = {}): Promise<UserDocument> {
        return this.userModel.findOne(query, select).lean();
    }

    async createEmailVerifyToken(idTokenData: Partial<EmailVerifyDocument>): Promise<EmailVerifyDocument> {
        return this.emailVerifyModel.create(idTokenData);
    }
}