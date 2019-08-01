import {Args, Resolver, Query} from '@nestjs/graphql';
import {ArticleModel} from '../../../domain/model/article.model';
import {ArticleEntity} from '../../../infra/entity/article.entity';

@Resolver(of => ArticleModel)
export class ArticleResolver {

    @Query(returns => ArticleEntity)
    async article(@Args('uuid') uuid: string): Promise<ArticleEntity> {
        return await new Promise(resolve => {
            const article = new ArticleEntity();
            article.uuid = uuid;
            article.title = 'title article test';
            resolve(article);
        });
    }
}
