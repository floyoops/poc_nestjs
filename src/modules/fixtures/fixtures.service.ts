import {Inject, Injectable} from '@nestjs/common';
import {FakerService} from '../faker/faker.service';
import {ArticleService} from '../article/infra/service/article.service';
import {CreateAnArticleCommand} from '../article/application/command/create-an-article.command';

@Injectable()
export class FixturesService {

    constructor(
        @Inject(FakerService) private readonly fakerService: FakerService,
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) {}

    public async injectArticles(): Promise<void[]> {
        const commands: CreateAnArticleCommand[] = [];
        commands.push(new CreateAnArticleCommand(
            '1cf6ded3-e986-4aeb-80ef-51b1b30892e0',
            'title of the first article',
        ));
        for (let i = 0; i < 9; i++) {
            commands.push(new CreateAnArticleCommand(
                this.fakerService.generateUUID(),
                this.fakerService.generateTitle(),
            ));
        }
        return Promise.all(commands.map(async (c: CreateAnArticleCommand) => {
             await this.articleService.create(c);
        }));
    }
}
