import {DeleteAnArticleCommandHandler} from '../../../application/command/handlers/delete-an-article.command-handler';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {DeleteAnArticleCommand} from '../../../application/command/delete-an-article.command';
import {ArticleCommandRepository} from '../../repository/article.command.repository';
import {IArticleCommandRepository} from '../../../domain/interfaces';
import {Inject} from '@nestjs/common';

@CommandHandler(DeleteAnArticleCommand)
export class DeleteAnArticleCommandHandlerService extends DeleteAnArticleCommandHandler implements ICommandHandler<DeleteAnArticleCommand> {

    constructor(
        @Inject(ArticleCommandRepository) articleCommandRepository: IArticleCommandRepository,
    ) {
        super(articleCommandRepository);
    }

    async execute(command: DeleteAnArticleCommand): Promise<boolean> {
        return await this.handle(command);
    }
}
