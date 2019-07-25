import {IArticle} from '../../src/modules/article/domain/interfaces';
import {ArticleModel} from '../../src/modules/article/domain/model/article.model';

export class MockArticleService {
    public static async findAll(): Promise<IArticle[]> {
        return new Promise((resolve) => {
            resolve([
                new ArticleModel(),
                new ArticleModel(),
            ]);
        });
    }
}
