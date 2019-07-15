export class CreateAnArticleCommand {
    constructor(
        public uuid: string,
        public title: string,
    ) {}
}
