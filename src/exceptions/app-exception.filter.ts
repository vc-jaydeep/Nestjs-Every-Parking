import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ResponseHandler } from 'src/utils/response-handler';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(private httpAdaptorHost: HttpAdapterHost) { }
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const body = {
            message: exception['response']?.message,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        };

        const { httpAdapter } = this.httpAdaptorHost;

        this.writeHttpLog(body);

        httpAdapter.reply(response, ResponseHandler.error(null, typeof exception['response']?.message === 'object' ? exception['response']?.message[0] : exception['response']?.message, status), status);
    }

    private async writeHttpLog(body: Record<string, any>) {
        const LOG_DIR = join(__dirname, `${Date.now()}_http_log.json`);

        try {
            await writeFile(LOG_DIR, JSON.stringify(body));
        } catch (error) {
            return;
        }
    }
}