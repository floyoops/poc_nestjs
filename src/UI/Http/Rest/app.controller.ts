import {Controller, Get, Inject} from '@nestjs/common';
import {ArticleService} from '../../../Infra/Service/ArticleService';

@Controller()
export class AppController {
  constructor(
      @Inject(ArticleService) private readonly articleService: ArticleService,
  ) {}

  @Get()
  getHello() {
    this.articleService.createNewArticle('test');
    return 'Hello World!';
  }
}
