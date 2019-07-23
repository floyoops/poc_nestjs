import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';
import {CreateAnArticleCommand} from '../../application/command/create-an-article.command';
import {ListAllArticlesQuery} from '../../application/query/list-all-articles.query';
import {IArticle} from '../../domain/interfaces';
import {FindOneArticleQuery} from '../../application/query/find-one-article.query';
import {DeleteAnArticleCommand} from '../../application/command/delete-an-article.command';

@Injectable()
export class ArticleService {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async findOne(query: FindOneArticleQuery): Promise<IArticle|undefined> {
        return await this.queryBus.execute(query);
    }

    async findAll(): Promise<IArticle[]> {
        const query = new ListAllArticlesQuery();
        return await this.queryBus.execute(query);
    }

    async delete(command: DeleteAnArticleCommand): Promise<boolean> {
        return await this.commandBus.execute(command);
    }

    async create(command: CreateAnArticleCommand) {
        return await this.commandBus.execute(command);
    }
}
