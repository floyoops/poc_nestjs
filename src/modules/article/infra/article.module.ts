import { Module } from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ArticleService} from './service/article.service';
import {ArticleFactoryService} from './factory/article.factory.service';
import {CommandHandlers} from './command/handlers';
import {ArticleEntity} from './entity/article.entity';
import {ArticleCommandRepository} from './repository/article.command.repository';

@Module({
  imports: [
      CqrsModule,
      TypeOrmModule.forFeature([ArticleEntity]),
  ],
  providers: [
    ArticleCommandRepository,
    ArticleService,
    ArticleFactoryService,
    ...CommandHandlers,
  ],
  exports: [ArticleService],
})

export class ArticleModule {}
