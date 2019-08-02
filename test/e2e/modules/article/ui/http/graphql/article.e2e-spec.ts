import {INestApplication, INestApplicationContext} from '@nestjs/common';
import {FixturesService} from '../../../../../../../src/modules/fixtures/fixtures.service';
import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../../../../../../src/app.module';
import {FixturesModules} from '../../../../../../../src/modules/fixtures/fixtures.modules';
import {getConnection} from 'typeorm';
import * as assert from 'assert';

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

    it('should return one article', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: '{article(uuid:"1cf6ded3-e986-4aeb-80ef-51b1b30892e0") {uuid, title}}',
            })
            .expect(200, {
                data: {
                    article: {
                        uuid: '1cf6ded3-e986-4aeb-80ef-51b1b30892e0',
                        title: 'title of the first article',
                    },
                },
            });
    });

    it('should return not exist article', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: '{article(uuid: "fake") {uuid, title}}',
            })
            .then(response => {
                const error = response.body.errors[0];
                assert.equal(error.message.statusCode, 404);
                assert.equal(error.message.message, 'Article fake not found');
                assert.equal(error.message.error, 'Not Found');
            });
    });
});
