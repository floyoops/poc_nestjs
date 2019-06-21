import { CommandBus } from '@nestjs/cqrs';
export declare class ArticleService {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    createNewArticle(title: string): Promise<any>;
}
