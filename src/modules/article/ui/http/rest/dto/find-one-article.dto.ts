import {IsUUID} from 'class-validator';

export class FindOneArticleDto {
    @IsUUID('4')
    uuid: string;
}
