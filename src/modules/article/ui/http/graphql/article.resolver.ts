import {Args, Resolver, Query, Mutation} from '@nestjs/graphql';
import {ArticleModel} from '../../../domain/model/article.model';
import {ArticleEntity} from '../../../infra/entity/article.entity';
import {HttpStatus, Inject} from '@nestjs/common';
import {ArticleService} from '../../../infra/service/article.service';
import {IArticle} from '../../../domain/interfaces';
import {FindOneArticleQuery} from '../../../application/query/find-one-article.query';
import {ArticlesArgs} from './dto/articles.args';
import {HttpArticleNotFoundException} from '../exception/http-article-not-found.exception';
import {CreateAnArticleCommand} from '../../../application/command/create-an-article.command';
import v4 = require('uuid/v4');
import {HttpArticleCreateException} from '../exception/http-article-create.exception';
import {CreateAnArticleDto} from './dto/create-an-article.dto';

@Resolver(of => ArticleModel)
export class ArticleResolver {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {
    }

    @Query(returns => [ArticleEntity])
    async articles(): Promise<IArticle[]> {
        return await this.articleService.findAll();
    }

    @Query(returns => ArticleEntity)
    async article(@Args() args: ArticlesArgs): Promise<IArticle|null> {
        const query = new FindOneArticleQuery(args.uuid);
        const article = await this.articleService.findOne(query);
        if (article === undefined) {
            throw new HttpArticleNotFoundException(`Article ${args.uuid} not found`, HttpStatus.NOT_FOUND);
        }
        return article;
    }

    @Mutation(returns => String)
    async createArticle(@Args() args: CreateAnArticleDto): Promise<string> {
        const articleUuid: string = ArticleResolver.getNewUuid();
        try {
            await this.articleService.create(new CreateAnArticleCommand(articleUuid, args.title));
        } catch (e) {
            throw new HttpArticleCreateException(`Error on create article`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return articleUuid;
    }

    private static getNewUuid(): string {
        return v4();
    }
}
