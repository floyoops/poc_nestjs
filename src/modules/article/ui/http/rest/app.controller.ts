import {Controller, Get, HttpException, Inject, Param} from '@nestjs/common';
import {ArticleService} from '../../../infra/service/article.service';
import {CreateAnArticleCommand} from '../../../application/command/create-an-article.command';
import v4 = require('uuid/v4');
import {FindOneArticleQuery} from '../../../application/query/find-one-article.query';
import {HttpArticleNotFoundException} from './exception/http-article-not-found.exception';

@Controller('article')
export class AppController {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {}

    @Get('/new')
    async  new() {
        try {
            const uuid: string = AppController.getNewUuid();
            const command = new CreateAnArticleCommand(uuid, 'Hello World!');
            return await this.articleService.article(command);
        } catch (e) {
            throw new HttpException(e, 500);
        }
    }

    @Get('/')
    async list() {
        try {
            return await this.articleService.findAll();
        } catch (e) {
            throw new HttpException(e, 500);
        }
    }

    private static getNewUuid(): string {
        return v4();
    }

    @Get('/:uuid')
    async getOne(@Param('uuid') uuid: string) {
        try {
            const query = new FindOneArticleQuery(uuid);
            const article = await this.articleService.findOne(query);
            if (article === undefined) {
                throw new HttpArticleNotFoundException('Article not found', 404);
            }
            return article;
        } catch (e) {
            throw new HttpException(e, 500);
        }
    }
}
