export class DeleteAnArticleException extends Error {
    constructor(response: string) {
        super(response);
    }
}
