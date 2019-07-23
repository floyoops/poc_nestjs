import {IsString} from 'class-validator';

export class CreateAnArticleDto {
    @IsString()
    readonly title: string;
}
