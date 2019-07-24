import {HttpException} from '@nestjs/common';

export class HttpArticleUpdateException extends HttpException {
    constructor(response: string | object, status: number) {
        super(response, status);
    }
}
