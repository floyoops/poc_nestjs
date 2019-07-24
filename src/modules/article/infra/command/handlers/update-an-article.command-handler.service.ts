import {UpdateAnArticleCommandHandler} from '../../../application/command/handlers/update-an-article.command-handler';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UpdateAnArticleCommand} from '../../../application/command/update-an-article.command';
import {ArticleQueryRepository} from '../../repository/article.query.repository';
import {IArticleCommandRepository, IArticleQueryRepository} from '../../../domain/interfaces';
import {ArticleCommandRepository} from '../../repository/article.command.repository';
import {Inject} from '@nestjs/common';

@CommandHandler(UpdateAnArticleCommand)
export class UpdateAnArticleCommandHandlerService extends UpdateAnArticleCommandHandler implements ICommandHandler<UpdateAnArticleCommand> {

    constructor(
        @Inject(ArticleQueryRepository) articleQueryRepository: IArticleQueryRepository,
        @Inject(ArticleCommandRepository) articleCommandRepository: IArticleCommandRepository,
    ) {
        super(articleQueryRepository, articleCommandRepository);
    }

    async execute(command: UpdateAnArticleCommand): Promise<any> {
        return await this.handler(command);
    }
}
