import {ArgsType, Field} from 'type-graphql';
import {IsUUID} from 'class-validator';

@ArgsType()
export class ArticlesArgs {
    @Field(type => String)
    @IsUUID('4')
    uuid: string;
}
