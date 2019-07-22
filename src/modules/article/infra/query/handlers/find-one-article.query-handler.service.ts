import {FindOneArticleQueryHandler} from '../../../application/query/handlers/find-one-article.query-handler';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {FindOneArticleQuery} from '../../../application/query/find-one-article.query';
import {IArticle, IArticleQueryRepository} from '../../../domain/interfaces';
import {Inject} from '@nestjs/common';
import {ArticleQueryRepository} from '../../repository/article.query.repository';

@QueryHandler(FindOneArticleQuery)
export class FindOneArticleQueryHandlerService extends FindOneArticleQueryHandler implements IQueryHandler {

    constructor(
        @Inject(ArticleQueryRepository) articleQueryRepository: IArticleQueryRepository,
    ) {
        super(articleQueryRepository);
    }

    execute(query: FindOneArticleQuery): Promise<IArticle> {
        return this.handle(query);
    }
}
