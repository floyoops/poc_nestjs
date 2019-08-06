import {IDomainEvent} from '../interfaces';

export class ArticleCreatedEvent implements IDomainEvent {
    public readonly articleUuid: string;
    constructor(articleUuid: string) {
        this.articleUuid = articleUuid;
    }

    public getName(): string {
        return 'articleCreated';
    }
}
