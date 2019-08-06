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
    update(article: IArticle): Promise<IArticle>;
    save(article: IArticle): Promise<IArticle>;
    delete(uuid: string): Promise<boolean>;
}

export interface IDomainEvent {
    getName(): string;
}
