import {EntityRepository, Repository} from 'typeorm';
import {ArticleEntity} from '../entity/article.entity';

@EntityRepository(ArticleEntity)
export class ArticleEntityRepository extends Repository<ArticleEntity> {
}
