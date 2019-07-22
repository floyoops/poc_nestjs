import {CommandBus} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';
import {CreateAnArticleCommand} from '../../application/command/create-an-article.command';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleEntity} from '../entity/article.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ArticleService {

    constructor(
      @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
      private readonly commandBus: CommandBus,
    ) {}

    findAll(): Promise<ArticleEntity[]> {
      return this.articleRepository.find();
    }

    async article(command: CreateAnArticleCommand) {
        return await this.commandBus.execute(command);
    }
}
