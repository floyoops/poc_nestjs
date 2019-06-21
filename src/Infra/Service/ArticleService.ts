import {CommandBus} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';
import {CreateAnArticleCommand} from '../../Application/Command/CreateAnArticle/CreateAnArticleCommand';

@Injectable()
export class ArticleService {

    constructor(private readonly commandBus: CommandBus) {}

    async createNewArticle(title: string) {
        return this.commandBus.execute(
            new CreateAnArticleCommand(title),
        );
    }
}
