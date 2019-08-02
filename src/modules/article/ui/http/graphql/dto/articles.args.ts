import {ArgsType, Field} from 'type-graphql';
import {IsUUID, Min} from 'class-validator';

@ArgsType()
export class ArticlesArgs {
    @Field(type => String)
    @IsUUID('4')
    @Min(18)
    uuid: string;
}
