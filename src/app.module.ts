import {Module} from '@nestjs/common';
import {ArticleModule} from './modules/article/infra/article.module';
import {AppController} from './modules/article/ui/http/rest/app.controller';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {GraphQLModule} from '@nestjs/graphql';

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

const optionsSqlite: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: './test/data/test.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    keepConnectionAlive: true,
};

let optionsOrmForRoot: TypeOrmModuleOptions;
if (process.env.NODE_ENV === 'test') {
    optionsOrmForRoot = optionsSqlite;
} else {
    optionsOrmForRoot = optionsMysql;
}

@Module({
    imports: [
        TypeOrmModule.forRoot(optionsOrmForRoot),
        ArticleModule,
        GraphQLModule.forRoot({
           debug: false,
           autoSchemaFile: 'schema.gql',
        }),
    ],
    controllers: [AppController],
})

export class AppModule {}
