import {IArticle} from '../../src/modules/article/domain/interfaces';

export class MockArticleEntityRepository {

    public static find(): Promise<IArticle[]> {
        return new Promise((resolve => {
            resolve([]);
        }));
    }

    public static save(article: IArticle): Promise<IArticle> {
        return new Promise((resolve =>  {
            resolve(article);
        }));
    }
}
