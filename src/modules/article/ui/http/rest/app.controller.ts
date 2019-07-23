import {Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Res} from '@nestjs/common';
import {ArticleService} from '../../../infra/service/article.service';
import v4 = require('uuid/v4');
import {FindOneArticleQuery} from '../../../application/query/find-one-article.query';
import {HttpArticleNotFoundException} from './exception/http-article-not-found.exception';
import {CreateAnArticleDto} from './dto/create-an-article.dto';
import {CreateAnArticleCommand} from '../../../application/command/create-an-article.command';

@Controller('article')
export class AppController {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {}

    @Post('/')
    async  new(@Body() createAnArticleDto: CreateAnArticleDto) {
        try {
            const command = new CreateAnArticleCommand(AppController.getNewUuid(), createAnArticleDto.title);
            return await this.articleService.article(command);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/')
    async list() {
        try {
            return await this.articleService.findAll();
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:uuid')
    async getOne(@Param('uuid') uuid: string) {
        try {
            const query = new FindOneArticleQuery(uuid);
            const article = await this.articleService.findOne(query);
            if (article === undefined) {
                throw new HttpArticleNotFoundException('Article not found', HttpStatus.NOT_FOUND);
            }
            return article;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private static getNewUuid(): string {
        return v4();
    }
}
