import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MailService } from './notification/mail.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [CommonService, MailService],
    exports: [CommonService, MailService],
})
export class CommonModule {
}