import {Args, Resolver, Query} from '@nestjs/graphql';
import {ArticleModel} from '../../../domain/model/article.model';
import {ArticleEntity} from '../../../infra/entity/article.entity';
import {Inject, NotFoundException} from '@nestjs/common';
import {ArticleService} from '../../../infra/service/article.service';
import {IArticle} from '../../../domain/interfaces';
import {FindOneArticleQuery} from '../../../application/query/find-one-article.query';
import {ArticlesArgs} from './dto/articles.args';

@Resolver(of => ArticleModel)
export class ArticleResolver {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {
    }

    @Query(returns => ArticleEntity)
    async article(@Args() args: ArticlesArgs): Promise<IArticle|null> {
        const query = new FindOneArticleQuery(args.uuid);
        const article = await this.articleService.findOne(query);
        if (article === undefined) {
            throw new NotFoundException(`Article ${args.uuid} not found`);
        }
        return article;
    }
}
