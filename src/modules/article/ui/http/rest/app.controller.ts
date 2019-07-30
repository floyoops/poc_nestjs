import {Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put} from '@nestjs/common';
import {ArticleService} from '../../../infra/service/article.service';
import v4 = require('uuid/v4');
import {FindOneArticleQuery} from '../../../application/query/find-one-article.query';
import {HttpArticleNotFoundException} from './exception/http-article-not-found.exception';
import {CreateAnArticleDto} from './dto/create-an-article.dto';
import {CreateAnArticleCommand} from '../../../application/command/create-an-article.command';
import {FindOneArticleDto} from './dto/find-one-article.dto';
import {IArticle} from '../../../domain/interfaces';
import {DeleteAnArticleCommand} from '../../../application/command/delete-an-article.command';
import {HttpArticleUpdateException} from './exception/http-article-update.exception';
import {UpdateAnArticleCommand} from '../../../application/command/update-an-article.command';
import {UpdateAnArticleDto} from './dto/update-an-article.dto';

@Controller('article')
export class AppController {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {}

    @Post('/')
    public async create(@Body() createAnArticleDto: CreateAnArticleDto): Promise<boolean> {
        const command = new CreateAnArticleCommand(AppController.getNewUuid(), createAnArticleDto.title);
        try {
            return await this.articleService.create(command);
        } catch (e) {
            throw new HttpException('Error on create article', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/')
    public async list(): Promise<IArticle[]> {
        try {
            return await this.articleService.findAll();
        } catch (e) {
            throw new HttpException('Error on list article', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:uuid')
    public async findOne(@Param() params: FindOneArticleDto): Promise<IArticle> {
        return await this.findOneArticleOr404(new FindOneArticleQuery(params.uuid));
    }

    @Put('/:uuid')
    public async update(
        @Param() params: FindOneArticleDto,
        @Body() updateAnArticleDto: UpdateAnArticleDto,
    ): Promise<boolean> {
        const articleUuid = params.uuid;
        await this.findOneArticleOr404(new FindOneArticleQuery(articleUuid));
        const command = new UpdateAnArticleCommand(articleUuid, updateAnArticleDto.title);
        try {
            return await this.articleService.update(command);
        } catch (e) {
            throw new HttpArticleUpdateException(`Error on update article ${articleUuid}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:uuid')
    async delete(@Param() params: FindOneArticleDto): Promise<boolean> {
        const articleUuid = params.uuid;
        await this.findOneArticleOr404(new FindOneArticleQuery(articleUuid));
        const command = new DeleteAnArticleCommand(articleUuid);
        try {
            return await this.articleService.delete(command);
        } catch (e) {
            throw new HttpException(`Error on delete article ${articleUuid}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     private async findOneArticleOr404(query: FindOneArticleQuery): Promise<IArticle> {
        const article: IArticle|undefined = await this.articleService.findOne(query);
        if (article === undefined) {
            throw new HttpArticleNotFoundException(`Article ${query.uuid} not found`, HttpStatus.NOT_FOUND);
        }
        return article;
    }

    private static getNewUuid(): string {
        return v4();
    }
}
