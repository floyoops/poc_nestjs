import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import {ArticleModule} from '../../../modules/article/infra/article.module';
import {ArticleService} from '../../../modules/article/infra/service/article.service';

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
      jest.spyOn(articleService, 'article').mockImplementation(() => result);
      appController.getHello()
        .then(r => expect(r).toEqual('Hello test !'))
      ;
    });
  });
});
