import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ArticleService} from './Infra/Service/ArticleService';
import {CqrsModule} from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
