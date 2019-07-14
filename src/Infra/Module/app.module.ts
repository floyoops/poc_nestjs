import { Module } from '@nestjs/common';
import { AppController } from '../../UI/Http/Rest/app.controller';
import { AppService } from '../Service/app.service';
import {ArticleService} from '../Service/ArticleService';
import {CqrsModule} from '@nestjs/cqrs';
import {CreateAnArticleCommandHandlerService} from '../Command/CreateAnArticleCommandHandlerService';

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