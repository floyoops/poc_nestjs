import {IArticle, IArticleFactory} from '../interfaces';
import {ArticleModel} from '../model/article.model';

export class ArticleFactory implements IArticleFactory {
    public create(uuid: string): IArticle {
        const article = new ArticleModel();
        article.uuid = uuid;
        return article;
    }
}
