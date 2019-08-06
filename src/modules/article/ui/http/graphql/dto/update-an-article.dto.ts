import {CreateAnArticleDto} from './create-an-article.dto';
import {ArgsType, Field} from 'type-graphql';
import {IsUUID} from 'class-validator';

@ArgsType()
export class UpdateAnArticleDto extends CreateAnArticleDto {
    @Field(type => String)
    @IsUUID('4')
    uuid: string;
}
