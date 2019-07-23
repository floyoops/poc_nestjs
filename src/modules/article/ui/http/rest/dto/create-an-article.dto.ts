import {IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';

export class CreateAnArticleDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4, {message: 'Title is too short. Minimal length is $value characters'})
    @MaxLength(50, {message: 'Title is too long. Maximal length is $value characters'})
    readonly title: string;
}
