import {INestApplication, INestApplicationContext} from '@nestjs/common';
import {FixturesService} from '../../../../../../../src/modules/fixtures/fixtures.service';
import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../../../../../../src/app.module';
import {FixturesModules} from '../../../../../../../src/modules/fixtures/fixtures.modules';
import {getConnection} from 'typeorm';

describe('Graphql article', () => {
    let app: INestApplication;
    let fixturesModule: INestApplicationContext;
    let fixturesService: FixturesService;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [AppModule, FixturesModules],
        })
            .compile();

        fixturesModule = testModule.select<FixturesModules>(FixturesModules);
        fixturesService = fixturesModule.get<FixturesService>(FixturesService);
        app = testModule.createNestApplication();
        await app.init();
        await getConnection().synchronize(true);
    });

    it('should return one article', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: '{article(uuid:"aaa") {uuid, title}}',
            })
            .expect(200, {
                data: {
                    article: {
                        uuid: 'aaa',
                        title: 'title article test',
                    },
                },
            });
    });
});
