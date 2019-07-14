import {CreateAnArticleCommand} from './CreateAnArticleCommand';

export class CreateAnArticleCommandHandler {
    handle(cmd: CreateAnArticleCommand): string {
        return cmd.title;
    }
}
