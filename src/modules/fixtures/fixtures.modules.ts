import {Module} from '@nestjs/common';
import {FakerModule} from '../faker/faker.module';
import {ArticleModule} from '../article/infra/article.module';
import {FixturesService} from './fixtures.service';

@Module({
    imports: [
        FakerModule,
        ArticleModule,
    ],
    providers: [
        FixturesService,
    ],
})

export class FixturesModules {}
