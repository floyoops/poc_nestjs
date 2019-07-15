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