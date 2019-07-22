export interface FactoryInterface {
    create(...args: any[]): any;
}

export interface IArticle {
    uuid: string;
    title: string;
}

export interface IArticleFactory extends FactoryInterface {
    create(uuid: string): IArticle;
}

export interface IArticleQueryRepository {
    findAll(): Promise<IArticle[]>;
    findOne(uuid: string): Promise<IArticle>;
}

export interface IArticleCommandRepository {
    save(article: IArticle);
}
