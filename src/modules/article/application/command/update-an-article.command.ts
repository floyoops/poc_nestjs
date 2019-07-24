export class UpdateAnArticleCommand {
    constructor(
        public uuid: string,
        public title: string,
    ) {}
}
