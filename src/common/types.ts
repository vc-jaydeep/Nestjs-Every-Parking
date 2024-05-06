export interface CommonResponse<T = any> {
    status: boolean;
    statusCode: number;
    message: string | string[];
    data: T | [];
    error: T | [];
}

export type OnlyMessageResponse = Promise<CommonResponse>;

export interface CommonMailResponse {
    accepted?: string[];
    rejected?: [];
    messageTime?: number;
    messageSize?: number;
    response?: string;
}

interface Attachment {
    filename: string;
    path?: Buffer | string;
    content?: Buffer | string;
    contentType?: string;
}

