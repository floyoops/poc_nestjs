import { CreateAnArticleCommandHandler } from '../../Application/Command/CreateAnArticle/CreateAnArticleCommandHandler';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateAnArticleCommand } from '../../Application/Command/CreateAnArticle/CreateAnArticleCommand';
export declare class CreateAnArticleCommandHandlerService extends CreateAnArticleCommandHandler implements ICommandHandler<CreateAnArticleCommand> {
    execute(command: CreateAnArticleCommand): Promise<any>;
}
