import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ArticleService} from './Infra/Service/ArticleService';
import {CqrsModule} from '@nestjs/cqrs';
import {CreateAnArticleCommandHandlerService} from './Infra/Command/CreateAnArticleCommandHandlerService';

export const commandHandlers = [CreateAnArticleCommandHandlerService];

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AppService,
    ArticleService,
    ...commandHandlers,
  ],
})
export class AppModule {}
