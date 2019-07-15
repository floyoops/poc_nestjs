import {CommandBus} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';
import {CreateAnArticleCommand} from '../../application/command/create-an-article.command';

@Injectable()
export class ArticleService {

    constructor(private readonly commandBus: CommandBus) {}

    async article(command: CreateAnArticleCommand) {
        return await this.commandBus.execute(command);
    }
}
