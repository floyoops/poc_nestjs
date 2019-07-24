import {CreateAnArticleCommandHandlerService} from './create-an-article.command-handler.service';
import {DeleteAnArticleCommandHandlerService} from './delete-an-article.command-handler.service';
import {UpdateAnArticleCommandHandlerService} from './update-an-article.command-handler.service';

export const CommandHandlers = [
    CreateAnArticleCommandHandlerService,
    DeleteAnArticleCommandHandlerService,
    UpdateAnArticleCommandHandlerService,
];
