import {ArticleModel} from '../../domain/model/article.model';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ArticleEntity extends ArticleModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    uuid: string;

    @Column({ length: 200 })
    title: string;
}
