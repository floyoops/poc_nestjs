import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../../../../../../src/app.module';
import {FixturesModules} from '../../../../../../../src/modules/fixtures/fixtures.modules';
import {FixturesService} from '../../../../../../../src/modules/fixtures/fixtures.service';
import {INestApplication, INestApplicationContext} from '@nestjs/common';
import * as assert from 'assert';

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
    });

    afterEach(() => {
        fixturesService.clear();
    });

    it('Should get a 404 for an unknown route', () => {
        return request(app.getHttpServer())
            .get('/unknown')
            .expect(404);
    });

    it('/article (GET)', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .get('/article')
            .expect(200)
            .then(response => {
                assert.equal(response.body.length, 10);
            });
    });
});
