import {Module} from '@nestjs/common';
import {ArticleModule} from './modules/article/infra/article.module';
import {AppController} from './modules/article/ui/http/rest/app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';
import {ConsumerModule} from './modules/consumer/consumer.module';
import {ConfigModule} from './modules/config/config.module';
import {ConfigService} from './modules/config/config.service';

if (process.env.NODE_ENV === 'test') {
    throw new Error('AppModule forbidden for env test');
}

@Module({
    imports: [
        ConsumerModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => (configService.getConfigDb()),
        }),
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
