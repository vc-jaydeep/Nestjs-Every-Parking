import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { VehicleModule } from './admin-modules/vehicle-module/vehicle.module';
import { AuthModule } from './app-modules/auth/auth.module';
import { CommonModule } from './app-modules/common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvFile } from './config/env.config';
import { AppExceptionFilter } from './exceptions/app-exception.filter';
import { DatabaseModule } from './infra/mongoose/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFile(),
    }),
    DatabaseModule,
    VehicleModule,
    AuthModule,
    CommonModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<string>('SMTP_PORT'),
          auth: {
            user: configService.get<string>('SMTP_USERNAME'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }
  ],
})
export class AppModule { }
