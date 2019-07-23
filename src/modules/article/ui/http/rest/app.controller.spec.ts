import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import {ArticleModule} from '../../../infra/article.module';
import {ArticleService} from '../../../infra/service/article.service';

describe('AppController', () => {
  let appController: AppController;
  let articleService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ArticleModule],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
    articleService = app.get<ArticleService>(ArticleService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const result = 'Hello test !';
      jest.spyOn(articleService, 'create').mockImplementation(() => result);
      appController.create()
          .then(r => expect(r).toEqual('Hello test !'))
      ;
    });
  });
});
