import {HttpException} from '@nestjs/common';

export class HttpArticleCreateException extends HttpException {
    constructor(response: string | object, status: number) {
        super(response, status);
    }
}
