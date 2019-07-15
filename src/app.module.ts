import {Module} from '@nestjs/common';
import {ArticleModule} from './modules/article/infra/article.module';
import {AppController} from './ui/http/rest/app.controller';

@Module({
    imports: [
        ArticleModule,
    ],
    controllers: [AppController],
})

export class AppModule {}
