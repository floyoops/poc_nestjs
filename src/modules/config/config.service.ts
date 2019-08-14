import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ArticleEntity} from '../article/infra/entity/article.entity';

export class ConfigService {
    private readonly envConfig: { [key: string]: string};

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    getConfigDb(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.get('DB_HOST'),
            port: parseInt(this.get('DB_PORT'), 10),
            username: this.get('DB_USERNAME'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
            entities: [ArticleEntity],
            synchronize: true,
            keepConnectionAlive: true,
        };
    }
}
