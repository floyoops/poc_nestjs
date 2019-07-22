import {IArticle, IArticleQueryRepository} from '../../../domain/interfaces';
import {FindOneArticleQuery} from '../find-one-article.query';

export class FindOneArticleQueryHandler {

    private readonly repository: IArticleQueryRepository;

    constructor(repository: IArticleQueryRepository) {
        this.repository = repository;
    }

    public handle(query: FindOneArticleQuery): Promise<IArticle> {
        return this.repository.findOne(query.uuid);
    }
}
