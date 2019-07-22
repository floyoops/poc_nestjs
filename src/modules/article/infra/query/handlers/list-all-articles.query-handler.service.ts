import {ListAllArticlesQueryHandler} from '../../../application/query/handlers/list-all-articles.query-handler';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {ListAllArticlesQuery} from '../../../application/query/list-all-articles.query';
import {IArticle, IArticleQueryRepository} from '../../../domain/interfaces';
import {Inject} from '@nestjs/common';
import {ArticleQueryRepository} from '../../repository/article.query.repository';

@QueryHandler(ListAllArticlesQuery)
export class ListAllArticlesQueryHandlerService extends ListAllArticlesQueryHandler implements IQueryHandler {

    constructor(
        @Inject(ArticleQueryRepository) articleQueryRepository: IArticleQueryRepository,
    ) {
        super(articleQueryRepository);
    }

    execute(query: ListAllArticlesQuery): Promise<IArticle[]> {
        return this.handle(query);
    }
}
