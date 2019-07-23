export class CreateAnArticleException extends Error {
    constructor(response: string) {
        super(response);
    }
}
