import {Controller, Get, HttpException, Inject} from '@nestjs/common';
import {ArticleService} from '../../../modules/article/infra/service/article.service';
import {CreateAnArticleCommand} from '../../../modules/article/application/command/create-an-article.command';

@Controller()
export class AppController {
  constructor(
      @Inject(ArticleService) private readonly articleService: ArticleService,
  ) {}

  @Get()
  async  getHello() {
    try {
        const command = new CreateAnArticleCommand('ab358607-3e72-4fb7-9eed-b1866a1b12e3', 'Hello World!');
        return await this.articleService.article(command);
    } catch (e) {
        throw new HttpException(e, 500);
    }
  }
}
