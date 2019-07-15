import {ArticleFactory} from '../../domain/factory/article.factory';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ArticleFactoryService extends ArticleFactory {
}
