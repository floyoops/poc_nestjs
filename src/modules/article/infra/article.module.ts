import { Module } from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ArticleService} from './service/article.service';
import {ArticleFactoryService} from './factory/article.factory.service';
import {CommandHandlers} from './command/handlers';

@Module({
  imports: [
      CqrsModule,
      TypeOrmModule.forRoot(),
  ],
  providers: [
    ArticleService,
    ArticleFactoryService,
    ...CommandHandlers,
  ],
  exports: [ArticleService],
})

export class ArticleModule {}
