import {Module} from '@nestjs/common';
import {ArticleModule} from './modules/article/infra/article.module';
import {AppController} from './modules/article/ui/http/rest/app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import {ConsumerModule} from './modules/consumer/consumer.module';
import {configuration} from './configuration';

if (process.env.NODE_ENV === 'test') {
    throw new Error('AppModule forbidden for env test');
}

@Module({
    imports: [
        ConsumerModule,
        TypeOrmModule.forRoot(configuration.db),
        ArticleModule,
        GraphQLModule.forRoot({
           debug: false,
           autoSchemaFile: 'schema.gql',
           installSubscriptionHandlers: true,
        }),
    ],
    controllers: [AppController],
})

export class AppModule {}
