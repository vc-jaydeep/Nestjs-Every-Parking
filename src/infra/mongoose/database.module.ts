import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNCECTION } from './database.config';
import { MongooseConfigService } from './mongoose-config.service';
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
            connectionName: DATABASE_CONNCECTION.APP
        }),
    ],
    exports: [MongooseModule]
})
export class DatabaseModule { }