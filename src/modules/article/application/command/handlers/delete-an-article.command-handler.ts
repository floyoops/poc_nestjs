import {IArticleCommandRepository} from '../../../domain/interfaces';
import {DeleteAnArticleCommand} from '../delete-an-article.command';
import {DeleteAnArticleException} from '../../../domain/exception/delete-an-article.exception';

export class DeleteAnArticleCommandHandler {

    private readonly articleCommandRepository: IArticleCommandRepository;

    constructor(articleCommandRepository: IArticleCommandRepository) {
        this.articleCommandRepository = articleCommandRepository;
    }

    public async handle(cmd: DeleteAnArticleCommand): Promise<boolean> {
        const articleUuid: string = cmd.uuid;
        try {
            return await this.articleCommandRepository.delete(articleUuid);
        } catch (e) {
            throw new DeleteAnArticleException(`Error on delete article ${articleUuid}`);
        }
    }
}
