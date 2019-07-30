import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../../../../../../src/app.module';

describe('AppController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Should get a 404 for an unknown route', () => {
        return request(app.getHttpServer())
            .get('/unknown')
            .expect(404);
    });

    it('/article (GET)', async () => {
        return request(app.getHttpServer())
            .get('/article')
            .expect(200);
    });
});
