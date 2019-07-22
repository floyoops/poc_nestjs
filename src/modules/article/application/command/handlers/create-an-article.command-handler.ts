import {CreateAnArticleCommand} from '../create-an-article.command';
import {IArticleCommandRepository, IArticleFactory} from '../../../domain/interfaces';

export class CreateAnArticleCommandHandler {

    private readonly articleFactory: IArticleFactory;
    private readonly articleCommandRepository: IArticleCommandRepository;

    constructor(
        articleFactory: IArticleFactory,
        articleCommandRepository: IArticleCommandRepository,
    ) {
        this.articleFactory = articleFactory;
        this.articleCommandRepository = articleCommandRepository;
    }

    public handle(cmd: CreateAnArticleCommand): string {
        const article = this.articleFactory.create(cmd.uuid);
        article.title = cmd.title;
        try {
            this.articleCommandRepository.save(article);
        } catch (e) {
            console.log('error', e);
        }
        return article.title;
    }
}
