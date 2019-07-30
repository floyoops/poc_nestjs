import {Inject, Injectable} from '@nestjs/common';
import {FakerService} from '../faker/faker.service';
import {ArticleService} from '../article/infra/service/article.service';

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
}
