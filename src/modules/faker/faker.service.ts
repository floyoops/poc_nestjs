import {Injectable} from '@nestjs/common';
import * as faker from 'faker';

@Injectable()
export class FakerService {
    public generateUUID(): string {
        return faker.random.uuid();
    }

    public generateTitle(): string {
        return faker.name.title;
    }
}
