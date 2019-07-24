import {IArticle, IArticleCommandRepository} from '../../domain/interfaces';
import {ArticleEntity} from '../entity/article.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ArticleCommandRepository implements IArticleCommandRepository {

    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {
    }

    public async save(article: IArticle): Promise<IArticle> {
        return await this.articleRepository.save(article);
    }

    public async delete(uuid: string): Promise<boolean> {
        await this.articleRepository.delete({uuid: uuid});
        return true;
    }

    public async update(article: IArticle): Promise<IArticle> {
        return await this.articleRepository.save(article);
    }
}
