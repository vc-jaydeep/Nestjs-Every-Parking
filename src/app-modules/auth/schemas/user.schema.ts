import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { FilterQuery, HydratedDocument } from 'mongoose';

@Schema({
    timestamps: true,
    methods: {
        async isValidPassword(this: UserDocument, candidatePassword: string) {
            const isMatched = await compare(candidatePassword, this.password);
            return isMatched;
        }
    },
})
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNunber: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isVerified: boolean;

    isValidPassword: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

async function encryptPassword(password: string) {
    const hashedPassword = await hash(password, 10);
    password = hashedPassword;
    return password;
}

UserSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await encryptPassword(this.password);
    }
    next();
});

export type UserDocument = HydratedDocument<User>;
export type UserQueryObject = Partial<FilterQuery<UserDocument>>;
export const USER_MODEL = User.name;