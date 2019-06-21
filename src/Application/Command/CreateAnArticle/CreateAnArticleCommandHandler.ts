import {CreateAnArticleCommand} from './CreateAnArticleCommand';

export class CreateAnArticleCommandHandler {
    public handle(cmd: CreateAnArticleCommand): void {
        let a = cmd.title;
    }
}
