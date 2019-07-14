import { Module } from '@nestjs/common';
import { AppController } from '../../UI/Http/Rest/app.controller';
import { AppService } from '../Service/app.service';
import {ArticleService} from '../Service/ArticleService';
import {CqrsModule} from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CreateAnArticleCommandHandlerService} from '../Command/CreateAnArticleCommandHandlerService';

export const commandHandlers = [CreateAnArticleCommandHandlerService];

@Module({
  imports: [
      CqrsModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'toor',
        database: 'poc_nestjs',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ArticleService,
    ...commandHandlers,
  ],
})
export class AppModule {}
