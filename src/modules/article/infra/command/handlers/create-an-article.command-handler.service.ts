import {CreateAnArticleCommandHandler} from '../../../application/command/handlers/create-an-article.command-handler';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {CreateAnArticleCommand} from '../../../application/command/create-an-article.command';
import {Inject} from '@nestjs/common';
import {ArticleFactoryService} from '../../factory/article.factory.service';
import {IArticleCommandRepository, IArticleFactory} from '../../../domain/interfaces';
import {ArticleCommandRepository} from '../../repository/article.command.repository';

@CommandHandler(CreateAnArticleCommand)
export class CreateAnArticleCommandHandlerService extends CreateAnArticleCommandHandler implements ICommandHandler<CreateAnArticleCommand> {

    constructor(
        @Inject(ArticleFactoryService) articleFactoryService: IArticleFactory,
        @Inject(ArticleCommandRepository) articleCommandRepository: IArticleCommandRepository,
    ) {
        super(articleFactoryService, articleCommandRepository);
    }

    async execute(command: CreateAnArticleCommand): Promise<any> {
        return await this.handle(command);
    }
}
