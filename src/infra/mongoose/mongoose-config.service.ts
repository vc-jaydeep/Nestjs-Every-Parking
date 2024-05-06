import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private configService: ConfigService) { }
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const url = this.configService.get<string>('MONGO_URL');
        const port = this.configService.get<number>('DATABASE_PORT');
        const dbName = this.configService.get<string>('DATABASE_NAME');
        const uri = `${url}:${port}/${dbName}`;
        return { uri };
    }


}