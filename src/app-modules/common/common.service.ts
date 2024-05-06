import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

    constructor() {
    }
    /**
    * Description - Generate random string common function
    * @param length number
    * @returns random string
    */
    public generateToken(length: number): string {
        let result = '';
        const char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < length; i++) {
            result += char.charAt(Math.floor(Math.random() * char.length));
        }
        return result;
    }
}