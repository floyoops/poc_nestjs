import {ArticleModel} from '../../domain/model/article.model';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ObjectType} from 'type-graphql';

@Entity()
@ObjectType()
export class ArticleEntity extends ArticleModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 50 })
    uuid: string;

    @Field()
    @Column({ length: 200 })
    title: string;
}
