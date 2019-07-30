import {Module} from '@nestjs/common';
import {ArticleModule} from './modules/article/infra/article.module';
import {AppController} from './modules/article/ui/http/rest/app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'toor',
            database: 'poc_nestjs',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            keepConnectionAlive: true,
        }),
        ArticleModule,
    ],
    controllers: [AppController],
})

export class AppModule {}
