import {CreateAnArticleCommand} from '../create-an-article.command';
import {IArticleCommandRepository, IArticleFactory} from '../../../domain/interfaces';
import {CreateAnArticleException} from '../../../domain/exception/create-an-article.exception';

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
        const articleUuid = cmd.uuid;
        const article = this.articleFactory.create(articleUuid);
        article.title = cmd.title;
        try {
            this.articleCommandRepository.save(article);
        } catch (e) {
            throw new CreateAnArticleException(`Error on create article ${articleUuid}`);
        }
        return article.title;
    }
}
