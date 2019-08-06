import { Module } from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ArticleService} from './service/article.service';
import {ArticleFactoryService} from './factory/article.factory.service';
import {CommandHandlers} from './command/handlers';
import {ArticleEntity} from './entity/article.entity';
import {ArticleCommandRepository} from './repository/article.command.repository';
import {ArticleQueryRepository} from './repository/article.query.repository';
import {QueryHandlers} from './query/handlers';
import {ArticleResolver} from '../ui/http/graphql/article.resolver';
import {PubSub} from 'graphql-subscriptions';

const pubSub = {
  provide: 'PUB_SUB',
  useValue: new PubSub(),
};

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ArticleEntity]),
  ],
  providers: [
    ArticleResolver,
    ArticleQueryRepository,
    ArticleCommandRepository,
    ArticleService,
    ArticleFactoryService,
    ...QueryHandlers,
    ...CommandHandlers,
    pubSub,
  ],
  exports: [ArticleService],
})

export class ArticleModule {}
