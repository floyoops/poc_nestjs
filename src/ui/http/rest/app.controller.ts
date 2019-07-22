import {Controller, Get, HttpException, Inject} from '@nestjs/common';
import {ArticleService} from '../../../modules/article/infra/service/article.service';
import {CreateAnArticleCommand} from '../../../modules/article/application/command/create-an-article.command';
import v4 = require('uuid/v4');

@Controller()
export class AppController {
  constructor(
      @Inject(ArticleService) private readonly articleService: ArticleService,
  ) {}

  @Get()
  async  getHello() {
    try {
        const uuid: string = AppController.getNewUuid();
        const command = new CreateAnArticleCommand(uuid, 'Hello World!');
        return await this.articleService.article(command);
    } catch (e) {
        throw new HttpException(e, 500);
    }
  }

  @Get('/list')
  async list() {
      try {
          return await this.articleService.findAll();
      } catch (e) {
          throw new HttpException(e, 500);
      }
  }

  private static getNewUuid(): string {
      return v4();
  }
}
