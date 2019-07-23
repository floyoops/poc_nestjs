import {IArticle, IArticleCommandRepository} from '../../domain/interfaces';
import {ArticleEntity} from '../entity/article.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ArticleCommandRepository implements IArticleCommandRepository {

    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {
    }

    save(article: IArticle) {
        return this.articleRepository.save(article);
    }

    async delete(uuid: string) {
        return await this.articleRepository.delete({uuid: uuid});
    }
}
