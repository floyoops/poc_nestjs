import {Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Request} from '@nestjs/common';
import {ArticleService} from '../../../infra/service/article.service';
import v4 = require('uuid/v4');
import {FindOneArticleQuery} from '../../../application/query/find-one-article.query';
import {HttpArticleNotFoundException} from './exception/http-article-not-found.exception';
import {CreateAnArticleDto} from './dto/create-an-article.dto';
import {CreateAnArticleCommand} from '../../../application/command/create-an-article.command';
import {FindOneArticleDto} from './dto/find-one-article.dto';
import {IArticle} from '../../../domain/interfaces';
import {DeleteAnArticleCommand} from '../../../application/command/delete-an-article.command';

@Controller('article')
export class AppController {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {}

    @Post('/')
    async create(@Body() createAnArticleDto: CreateAnArticleDto) {
        try {
            const command = new CreateAnArticleCommand(AppController.getNewUuid(), createAnArticleDto.title);
            return this.articleService.create(command);
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
    async findOne(@Param() params: FindOneArticleDto) {
        try {
            const query = new FindOneArticleQuery(params.uuid);
            return await this.findOneArticleOr404(query);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:uuid')
    async delete(@Param() params: FindOneArticleDto) {
        // Check if create exist.
        await this.findOneArticleOr404(new FindOneArticleQuery(params.uuid));

        // Delete the create.
        try {
            const command = new DeleteAnArticleCommand(params.uuid);
            return await this.articleService.delete(command);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     private async findOneArticleOr404(query: FindOneArticleQuery): Promise<IArticle> {
        const article: IArticle|undefined = await this.articleService.findOne(query);
        if (article === undefined) {
            throw new HttpArticleNotFoundException('Article not found', HttpStatus.NOT_FOUND);
        }
        return article;
    }

    private static getNewUuid(): string {
        return v4();
    }
}
