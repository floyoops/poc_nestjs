import {CreateAnArticleCommandHandler} from '../../Application/Command/CreateAnArticle/CreateAnArticleCommandHandler';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {CreateAnArticleCommand} from '../../Application/Command/CreateAnArticle/CreateAnArticleCommand';

@CommandHandler(CreateAnArticleCommand)
export class CreateAnArticleCommandHandlerService extends CreateAnArticleCommandHandler implements ICommandHandler<CreateAnArticleCommand> {
    async execute(command: CreateAnArticleCommand): Promise<any> {
        await this.handle(command);
    }
}
