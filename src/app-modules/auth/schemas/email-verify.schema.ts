import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Defaults } from 'src/config/message.config';
import { USER_MODEL } from './user.schema';

@Schema({ timestamps: true })
export class EmailVerify {
    @Prop({ required: true })
    token: string;

    @Prop({ required: true, ref: USER_MODEL })
    userId: Types.ObjectId;

    @Prop({
        expires: Defaults.EMAIL_VERIFICATION_TOKEN_EXPIRY,
    })
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}


export const EMAIL_VERIFY_MODEL = EmailVerify.name;
export const EmailVerifySchema = SchemaFactory.createForClass(EmailVerify);
export type EmailVerifyDocument = HydratedDocument<EmailVerify>;