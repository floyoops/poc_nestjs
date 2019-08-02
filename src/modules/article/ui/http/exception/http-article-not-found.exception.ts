import {HttpException} from '@nestjs/common';

export class HttpArticleNotFoundException extends HttpException {
    constructor(response: string | object, status: number) {
        super(response, status);
    }
}
