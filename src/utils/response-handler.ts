import { CommonResponse } from 'src/common/types';

export class ResponseHandler {
    /**
     * Description - Handler for Success Response
     * @param data
     * @param message
     * @param statusCode
     * @returns
     */
    public static success<T>(data: T, message: string | string[], statusCode: number): CommonResponse<T> {
        return {
            status: true,
            statusCode,
            message,
            data: data || [],
            error: [],
        };
    }

    /**
     * Description - Handler for Error Response
     * @param error
     * @param message
     * @param statusCode
     * @returns
     */
    public static error<T>(error: T, message: string | string[], statusCode: number): CommonResponse<T> {
        return {
            status: false,
            statusCode,
            message,
            data: [],
            error,
        };
    }
}