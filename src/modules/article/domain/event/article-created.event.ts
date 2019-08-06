import {ArgsType, Field} from 'type-graphql';

@ArgsType()
export class ArticleCreatedEvent {
    @Field(type => String)
    public readonly articleUuid: string;
    constructor(articleUuid: string) {
        this.articleUuid = articleUuid;
    }
}
