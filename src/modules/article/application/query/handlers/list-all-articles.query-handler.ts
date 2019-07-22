import {ListAllArticlesQuery} from '../list-all-articles.query';
import {IArticle, IArticleQueryRepository} from '../../../domain/interfaces';

export class ListAllArticlesQueryHandler {

    private readonly repository: IArticleQueryRepository;

    constructor(repository: IArticleQueryRepository) {
        this.repository = repository;
    }

    public handle(query: ListAllArticlesQuery): Promise<IArticle[]> {
        return this.repository.findAll();
    }
}
