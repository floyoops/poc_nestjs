import { CreateAnArticleCommandHandler } from '../../Command/CreateAnArticle/CreateAnArticleCommandHandler';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateAnArticleCommand } from '../../Command/CreateAnArticle/CreateAnArticleCommand';
export declare class CreateAnArticleCommandHandlerService extends CreateAnArticleCommandHandler implements ICommandHandler<CreateAnArticleCommand> {
    execute(command: CreateAnArticleCommand): Promise<any>;
}
