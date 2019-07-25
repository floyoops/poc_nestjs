import {IArticle, IArticleQueryRepository} from '../../domain/interfaces';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleEntity} from '../entity/article.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ArticleQueryRepository implements IArticleQueryRepository {

    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {
    }

    async findAll(): Promise<IArticle[]> {
        return await this.articleRepository.find();
    }

    async findOne(uuid: string): Promise<IArticle|undefined> {
        return await  this.articleRepository.findOne({where: {uuid: uuid}});
    }
}
