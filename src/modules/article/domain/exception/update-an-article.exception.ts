export class UpdateAnArticleException extends Error {
    constructor(response: string) {
        super(response);
    }
}
