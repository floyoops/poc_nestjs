import {Inject, Injectable} from '@nestjs/common';
import {FakerService} from '../faker/faker.service';
import {ArticleService} from '../article/infra/service/article.service';
import {CreateAnArticleCommand} from '../article/application/command/create-an-article.command';

@Injectable()
export class FixturesService {

    constructor(
        @Inject(FakerService) private readonly fakerService: FakerService,
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {
    }

    public async clear(): Promise<void> {
        await this.articleService.clear();
    }

    public async injectArticles(): Promise<void[]> {
        const commands: CreateAnArticleCommand[] = [];
        for (let i = 0; i < 10; i++) {
            const cmd = new CreateAnArticleCommand(this.fakerService.generateUUID(), this.fakerService.generateTitle());
            commands.push(cmd);
        }
        return Promise.all(commands.map((c: CreateAnArticleCommand) => {
            this.articleService.create(c);
        }));
    }
}
