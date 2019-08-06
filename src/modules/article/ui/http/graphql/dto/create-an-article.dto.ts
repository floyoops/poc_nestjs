import {IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {ArgsType, Field} from 'type-graphql';

@ArgsType()
export class CreateAnArticleDto {
    @Field(type => String)
    @IsNotEmpty()
    @IsString()
    @MinLength(4, {message: 'Title is too short. Minimal length is $value characters'})
    @MaxLength(50, {message: 'Title is too long. Maximal length is $value characters'})
    readonly title: string;
}
