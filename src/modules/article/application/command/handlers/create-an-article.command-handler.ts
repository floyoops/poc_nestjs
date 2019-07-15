import {CreateAnArticleCommand} from '../create-an-article.command';
import {IArticleFactory} from '../../../domain/interfaces';

export class CreateAnArticleCommandHandler {
    private readonly articleFactory: IArticleFactory;

    constructor(articleFactory: IArticleFactory) {
        this.articleFactory = articleFactory;
    }

    public handle(cmd: CreateAnArticleCommand): string {
        const article = this.articleFactory.create(cmd.uuid);
        article.title = cmd.title;
        return article.title;
    }
}
