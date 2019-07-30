import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../../../../../../src/app.module';
import {FixturesModules} from '../../../../../../../src/modules/fixtures/fixtures.modules';
import {FixturesService} from '../../../../../../../src/modules/fixtures/fixtures.service';
import {INestApplication, INestApplicationContext} from '@nestjs/common';
import * as assert from 'assert';
import {getConnection} from 'typeorm';

describe('AppController (e2e)', () => {
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

    it('Should get a 404 for an unknown route', () => {
        return request(app.getHttpServer())
            .get('/unknown')
            .expect(404);
    });

    it('/article (GET)', async () => {
        await fixturesService.injectArticles();
        await request(app.getHttpServer())
            .get('/article')
            .expect(200)
            .then(response => {
                assert.equal(response.body.length, 10);
            });
    });

    it('/article/1cf6ded3-e986-4aeb-80ef-51b1b30892e0 (GET)', async () => {
        await fixturesService.injectArticles();
        await request(app.getHttpServer())
            .get('/article/1cf6ded3-e986-4aeb-80ef-51b1b30892e0')
            .expect(200)
            .then(async response => {
                await assert.equal(response.body.uuid, '1cf6ded3-e986-4aeb-80ef-51b1b30892e0');
                await assert.equal(response.body.title, 'title of the first article');
            });
    });

    it('/article (POST)', async () => {
        await fixturesService.injectArticles();
        await request(app.getHttpServer())
            .post('/article')
            .send({title: 'my title of article test'})
            .expect(201)
            .then(async (responseCreated) => {
                assert.equal(responseCreated.text, 'true');
                await request(app.getHttpServer())
                    .get('/article')
                    .expect(200)
                    .then(responseListed => {
                        assert.equal(responseListed.body.length, 11);
                        assert.equal(responseListed.body[10].title, 'my title of article test');
                    });
            });
    });

    it('/article/1cf6ded3-e986-4aeb-80ef-51b1b30892e0 (PUT)', async () => {
        await fixturesService.injectArticles();
        await request(app.getHttpServer())
            .put('/article/1cf6ded3-e986-4aeb-80ef-51b1b30892e0')
            .send({title: 'title update'})
            .expect(200)
            .then(async responseUpdated => {
                assert.equal(responseUpdated.text, 'true');
                await request(app.getHttpServer())
                    .get('/article/1cf6ded3-e986-4aeb-80ef-51b1b30892e0')
                    .expect(200)
                    .then(responseOne => {
                        assert.equal(responseOne.body.title, 'title update');
                    });
            });
    });
});
