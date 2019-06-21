import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ArticleService} from './Infra/Service/ArticleService';
import {CreateAnArticleCommandHandlerService} from './Infra/Command/CreateAnArticleCommandHandlerService';
export const commandHandlers = [CreateAnArticleCommandHandlerService];
import {CqrsModule} from '@nestjs/cqrs';

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [AppController],
      providers: [AppService, ArticleService, ...commandHandlers],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
