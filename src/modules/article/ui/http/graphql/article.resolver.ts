import {Args, Resolver, Query, Mutation, Subscription} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
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
import {UpdateAnArticleCommand} from '../../../application/command/update-an-article.command';
import {HttpArticleUpdateException} from '../exception/http-article-update.exception';
import {UpdateAnArticleDto} from './dto/update-an-article.dto';
import {DeleteAnArticleCommand} from '../../../application/command/delete-an-article.command';
import {HttpArticleDeleteException} from '../exception/http-article-delete.exception';
import {ArticleCreatedEvent} from '../../../domain/event/article-created.event';

const pubSub = new PubSub();

@Resolver(of => ArticleModel)
export class ArticleResolver {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {}

    @Query(returns => [ArticleEntity])
    async articles(): Promise<IArticle[]> {
        return await this.articleService.findAll();
    }

    @Query(returns => ArticleEntity)
    article(@Args() args: ArticlesArgs): Promise<IArticle|null> {
        return this.findOneArticleOr404(args.uuid);
    }

    @Mutation(returns => String)
    async createArticle(@Args() args: CreateAnArticleDto): Promise<string> {
        const articleUuid: string = ArticleResolver.getNewUuid();
        try {
            await this.articleService.create(new CreateAnArticleCommand(articleUuid, args.title));
        } catch (e) {
            throw new HttpArticleCreateException(`Error on create article`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        pubSub.publish('articleCreated', new ArticleCreatedEvent(articleUuid));
        return articleUuid;
    }

    @Mutation(returns => Boolean)
    async updateArticle(@Args() args: UpdateAnArticleDto): Promise<boolean> {
        const articleUuid: string = args.uuid;
        await this.findOneArticleOr404(articleUuid);
        try {
            await this.articleService.update(new UpdateAnArticleCommand(articleUuid, args.title));
        } catch (e) {
            throw new HttpArticleUpdateException(`Error on update article ${articleUuid}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return true;
    }

    @Mutation(returns => Boolean)
    async deleteArticle(@Args() args: ArticlesArgs): Promise<boolean> {
        const articleUuid = args.uuid;
        await this.findOneArticleOr404(articleUuid);
        try {
            await this.articleService.delete(new DeleteAnArticleCommand(articleUuid));
        } catch (e)  {
            throw new HttpArticleDeleteException(`Error on delete article ${articleUuid}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return true;
    }

    @Subscription(returns => String, {
        resolve: (payload: ArticleCreatedEvent) => payload.articleUuid,
    })
    articleCreated() {
        return pubSub.asyncIterator('articleCreated');
    }

    private async findOneArticleOr404(articleUuid: string): Promise<IArticle> {
        const query = new FindOneArticleQuery(articleUuid);
        const article = await this.articleService.findOne(query);
        if (article === undefined) {
            throw new HttpArticleNotFoundException(`Article ${articleUuid} not found`, HttpStatus.NOT_FOUND);
        }
        return article;
    }

    private static getNewUuid(): string {
        return v4();
    }
}
