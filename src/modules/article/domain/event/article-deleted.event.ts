import {IDomainEvent} from '../interfaces';

export class ArticleDeletedEvent implements IDomainEvent {
    public readonly articleUuid: string;
    constructor(articleUuid: string) {
        this.articleUuid = articleUuid;
    }

    getName(): string {
        return 'articleDeleted';
    }
}
