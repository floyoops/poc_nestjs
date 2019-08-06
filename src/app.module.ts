import {Module} from '@nestjs/common';
import {ArticleModule} from './modules/article/infra/article.module';
import {AppController} from './modules/article/ui/http/rest/app.controller';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';

if (process.env.NODE_ENV === 'test') {
    throw new Error('AppModule forbidden for env test');
}
const optionsMysql: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'toor',
    database: 'poc_nestjs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    keepConnectionAlive: true,
};

@Module({
    imports: [
        TypeOrmModule.forRoot(optionsMysql),
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
