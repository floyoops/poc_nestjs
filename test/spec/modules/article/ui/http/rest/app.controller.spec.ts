import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../../../../../src/modules/article/ui/http/rest/app.controller';
import {ArticleModule} from '../../../../../../../src/modules/article/infra/article.module';
import {ArticleService} from '../../../../../../../src/modules/article/infra/service/article.service';
import {ArticleEntityRepository} from '../../../../../../../src/modules/article/infra/repository/article.entity.repository';
import {MockArticleEntityRepository} from '../../../../../../mock/mock.article.entity.repository';
import {ArticleModel} from '../../../../../../../src/modules/article/domain/model/article.model';
import {IArticle} from '../../../../../../../src/modules/article/domain/interfaces';

describe('AppController', () => {
    let appController: AppController;
    let articleService;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [ArticleModule],
            controllers: [AppController],
        })
            .overrideProvider(ArticleEntityRepository)
            .useValue(MockArticleEntityRepository)
            .compile();

        appController = app.get<AppController>(AppController);
        articleService = app.get<ArticleService>(ArticleService);
  });

    describe('root', () => {
        it('should return "Hello World!"', async () => {
            const result: Promise<IArticle[]> = new Promise((resolve =>  {
                const article1 = new ArticleModel();
                article1.uuid = 'uuid1';
                article1.title = 'title1';
                const article2 = new ArticleModel();
                article2.uuid = 'uuid2';
                article2.title = 'title2';
                resolve([article1, article2]);
            }));
            jest.spyOn(articleService, 'findAll').mockImplementation(() => result);
            await appController.list()
                .then((r) => {
                    expect(r[1].title).toEqual('title2');
                })
            ;
        });
    });
});
