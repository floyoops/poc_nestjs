import {INestApplication, INestApplicationContext, ValidationPipe} from '@nestjs/common';
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
        app.useGlobalPipes(new ValidationPipe({transform: true}));
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

    it('should return article not found', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: '{article(uuid:"6fa44be4-8a35-49e4-91b5-f66bbb2e9cbb") {uuid, title}}',
            })
            .then(response => {
                assert.equal(response.body.data, null);
                assert.equal(response.body.errors[0].message, 'Article 6fa44be4-8a35-49e4-91b5-f66bbb2e9cbb not found');
            });
    });

    it('400 bad uuid', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: '{article(uuid: "fake_bad_uuid") {uuid, title}}',
            })
            .then(response => {
                assert.equal(response.body.data, null);
                assert.equal(response.body.errors[0].message.statusCode, 400);
                assert.equal(response.body.errors[0].message.error, 'Bad Request');
                assert.equal(response.body.errors[0].message.message[0].constraints.isUuid, 'uuid must be an UUID');
            });
    });

    it('should return a collection of articles', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: '{articles {uuid, title}}',
            })
            .expect(200)
            .then(response => {
                assert.equal(response.body.data.articles.length, 10);
            });
    });
});
