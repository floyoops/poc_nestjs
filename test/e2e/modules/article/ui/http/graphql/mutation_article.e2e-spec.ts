import {Test, TestingModule} from '@nestjs/testing';
import {ArticleModule} from '../../../../../../../src/modules/article/infra/article.module';
import {FixturesModules} from '../../../../../../../src/modules/fixtures/fixtures.modules';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ArticleEntity} from '../../../../../../../src/modules/article/infra/entity/article.entity';
import {GraphQLModule} from '@nestjs/graphql';
import {FixturesService} from '../../../../../../../src/modules/fixtures/fixtures.service';
import {INestApplication, INestApplicationContext, ValidationPipe} from '@nestjs/common';
import {getConnection} from 'typeorm';
import * as request from 'supertest';
import * as assert from 'assert';

describe('Mutation Graphql article', () => {
    let app: INestApplication;
    let fixturesModule: INestApplicationContext;
    let fixturesService: FixturesService;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [
                ArticleModule,
                FixturesModules,
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: './test/data/e2e_mutation_article_graphql.sqlite',
                    entities: [ArticleEntity],
                    synchronize: true,
                    keepConnectionAlive: true,
                }),
                GraphQLModule.forRoot({
                    debug: false,
                    autoSchemaFile: 'schema.gql',
                }),
            ],
        })
            .compile();

        fixturesModule = testModule.select<FixturesModules>(FixturesModules);
        fixturesService = fixturesModule.get<FixturesService>(FixturesService);
        app = testModule.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({transform: true}));
        await app.init();
        await getConnection().synchronize(true);
    });

    it('create new article', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation {createArticle(title: "a one title")}',
            })
            .expect(200)
            .then(async responseCreated => {
                expect(responseCreated.body.data.createArticle).not.toBeNull();
                await request(app.getHttpServer())
                    .post('/graphql')
                    .send({
                        query: '{articles {uuid, title}}',
                    })
                    .expect(200)
                    .then(responseListed => {
                        assert.equal(responseListed.body.data.articles.length, 11);
                    });
            });
    });

    it('update an article', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation {updateArticle(uuid: "1cf6ded3-e986-4aeb-80ef-51b1b30892e0", title: "update the title")}',
            })
            .expect(200)
            .then(async responseUpdated => {
                assert.equal(responseUpdated.body.data.updateArticle, true);
                await request(app.getHttpServer())
                    .post('/graphql')
                    .send({
                        query: '{article(uuid: "1cf6ded3-e986-4aeb-80ef-51b1b30892e0") {uuid, title}}',
                    })
                    .expect(200)
                    .then(responseOne => {
                        assert.equal(responseOne.body.data.article.title, 'update the title');
                    });
            });
    });

    it ('update an article 400', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation {updateArticle(uuid: "1cf6ded3-e986-4aeb-80ef-51b1b30892e0", title: "a")}',
            })
            .expect(200)
            .then(async responseUpdated => {
                assert.equal(responseUpdated.body.data, null);
                assert.equal(responseUpdated.body.errors[0].message.statusCode, 400);
                assert.equal(
                    responseUpdated.body.errors[0].message.message[0].constraints.minLength,
                    'Title is too short. Minimal length is a characters',
                );
            });
    });

    it ('update an article 404', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation {updateArticle(uuid: "a39aa37e-a337-4329-b824-002d95c6a186", title: "update the title")}',
            })
            .expect(200)
            .then(async responseUpdated => {
                assert.equal(responseUpdated.body.errors[0].message, 'Article a39aa37e-a337-4329-b824-002d95c6a186 not found');
                assert.equal(responseUpdated.body.errors[0].extensions.exception.status, 404);
            });
    });

    it ('delete an article', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation {deleteArticle(uuid: "1cf6ded3-e986-4aeb-80ef-51b1b30892e0")}',
            })
            .expect(200)
            .then(async responseDeleted => {
                assert.equal(responseDeleted.body.data.deleteArticle, true);
                await request(app.getHttpServer())
                    .post('/graphql')
                    .send({
                        query: '{article(uuid: "1cf6ded3-e986-4aeb-80ef-51b1b30892e0") {uuid, title}}',
                    })
                    .expect(200)
                    .then(responseOne => {
                        assert.equal(responseOne.body.data, null);
                        assert.equal(responseOne.body.errors[0].message, 'Article 1cf6ded3-e986-4aeb-80ef-51b1b30892e0 not found');
                        assert.equal(responseOne.body.errors[0].extensions.exception.status, 404);
                    });
            });
    });

    it ('delete an article with fake uuid', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation {deleteArticle(uuid: "fakefake-fake-fake-fake-fakefakefake")}',
            })
            .expect(200)
            .then(responseDeleted => {
                assert.equal(responseDeleted.body.errors[0].message.statusCode, 400);
                assert.equal(responseDeleted.body.errors[0].message.message[0].constraints.isUuid, 'uuid must be an UUID');
            });
    });

    it ('delete an article 404', async () => {
        await fixturesService.injectArticles();
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation {deleteArticle(uuid: "27ef8039-a638-4843-a257-9fdb705f77a0")}',
            })
            .expect(200)
            .then(responseDeleted => {
                assert.equal(responseDeleted.body.errors[0].message, 'Article 27ef8039-a638-4843-a257-9fdb705f77a0 not found');
            });
    });
});
