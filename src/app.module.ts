import {Module} from '@nestjs/common';
import {ArticleModule} from './modules/article/infra/article.module';
import {AppController} from './ui/http/rest/app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ArticleModule,
    ],
    controllers: [AppController],
})

export class AppModule {}
