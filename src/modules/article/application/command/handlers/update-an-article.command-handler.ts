import {IArticle, IArticleCommandRepository, IArticleQueryRepository} from '../../../domain/interfaces';
import {UpdateAnArticleCommand} from '../update-an-article.command';
import {UpdateAnArticleException} from '../../../domain/exception/update-an-article.exception';

export class UpdateAnArticleCommandHandler {

    private readonly articleQueryRepository: IArticleQueryRepository;
    private readonly articleCommandRepository: IArticleCommandRepository;

    constructor(
        articleQueryRepository: IArticleQueryRepository,
        articleCommandRepository: IArticleCommandRepository,
    ) {
        this.articleQueryRepository = articleQueryRepository;
        this.articleCommandRepository = articleCommandRepository;
    }

    public async handler(cmd: UpdateAnArticleCommand): Promise<boolean> {
        const articleUuid = cmd.uuid;
        const article = await this.findArticleOrException(articleUuid);
        article.title = cmd.title;
        try {
            await this.articleCommandRepository.update(article);
        } catch (e) {
            throw new UpdateAnArticleException(`Error on save article ${articleUuid}`);
        }
        return true;
    }

    private async findArticleOrException(articleUuid: string): Promise<IArticle> {
        let article = null;
        try {
            article = await this.articleQueryRepository.findOne(articleUuid);
        } catch (e) {
            throw new UpdateAnArticleException(`Error on find article ${articleUuid}`);
        }
        if (article === undefined || article === null) {
            throw new UpdateAnArticleException(`Article ${articleUuid} not found`);
        }
        return article;
    }
}
