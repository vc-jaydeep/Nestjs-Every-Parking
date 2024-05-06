import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { renderFile } from 'ejs';
import * as path from 'path';
import { CommonMailResponse } from 'src/common/types';
import { EmailData } from '../types';

@Injectable()
export class MailService {

    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) { }

    async sendVerificationEmail(emailData: EmailData): Promise<CommonMailResponse> {
        const ejsPath = path?.join(__dirname, './templates/verify-user.ejs');

        if (!ejsPath) throw new BadRequestException('Email template not found');

        const template = await renderFile(ejsPath, {
            name: emailData.name,
            email: emailData.email,
            redirectUrl: emailData.redirectUrl,
        });

        const sendEmailData = {
            to: emailData.email,
            subject: emailData.subject,
            template: template,
        };

        try {
            const email = await this.sendEmail(sendEmailData);
            return email;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async sendEmail(sendEmailData: ISendMailOptions): Promise<CommonMailResponse> {
        return this.mailerService.sendMail({
            ...sendEmailData,
            from: this.configService.get<string>('EMAIL_FROM'),
        }) as Promise<CommonMailResponse>;
    }

}