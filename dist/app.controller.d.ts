import { ArticleService } from './Infra/Service/ArticleService';
export declare class AppController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getHello(): string;
}
