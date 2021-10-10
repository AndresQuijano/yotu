const expect = require('expect');
const rewire = require('rewire');
const supertest = require('supertest');
const { log } = console;
const app = require('../src/app');
const Video = require('../src/models/videoModel');
const setupDb = require('./fixtures/dbSetup');

describe('post(/video) route:', () => {
    before(async () => {
        await setupDb.setupDbForTesting();
    });

    it('Should save a video successfully and delete empty tags', async () => {
        const response = await supertest(app)
            .post('/video')
            .send({
                "name": "Some name video",
                "description": "Some short and precise desciption",
                "uploader": "pepe@email.com",
                "tags": ["tag1", "tag2", "", ""],
                "url": "https://static.filestackapi.com/v3/filestack4.js"
            })
            .expect(201);

        const savedVideo = await Video.findById(response.body.video._id);

        expect(response.body.video._id).toBeDefined();
        expect(savedVideo.tags.length).toBe(2);
    });

    it("Shouldn't save video if validation fails (email)", async () => {
        const response = await supertest(app)
            .post('/video')
            .send({
                "name": "Some name",
                "description": "Some short and precise desciption",
                "uploader": "pepe-email.com",
                "tags": ["tag1", "tag2"],
                "url": "https://static.filestackapi.com/v3/filestack.js"
            })
            .expect(400);

        expect(response.body.errorMessage).toBe('Video validation failed: uploader: Email is invalid');
    });

    it("Shouldn't save video if validation fails (URL)", async () => {
        const response = await supertest(app)
            .post('/video')
            .send({
                "name": "Name",
                "description": "Some short and precise desciption",
                "uploader": "pepe@email.com",
                "tags": ["tag1", "tag2"],
                "url": "httpsstaticfilestackapicomv3filestackjs"
            })
            .expect(400);

        expect(response.body.errorMessage).toBe('Video validation failed: url: URL is invalid');
    });
});

describe('get(/video) route:', () => {
    before(async () => {
        await setupDb.setupDbForTesting();
    });

    it('Should find video by name', async () => {
        const response = await supertest(app)
            .get('/video/one')
            .expect(200);

        expect(response.body[0].name).toBe('one');
    });

    it('Should find video by tag', async () => {
        const response = await supertest(app)
            .get('/video/second')
            .expect(200);

        expect(response.body[0].tags.includes('second')).toBe(true);
    });

    it('Should find video by description', async () => {
        const response = await supertest(app)
            .get('/video/fish')
            .expect(200);

        expect(response.body[0].description).toBe('A bird playing with a fish');
    });

    it('Should find video by uploader', async () => {
        const response = await supertest(app)
            .get('/video/andres')
            .expect(200);

        expect(response.body.length).toBe(2);
    });

    it('Should validate special characters in criteria', async () => {
        const response = await supertest(app)
            .get('/video/fal$eCiter&a')
            .expect(400);

        expect(response.body.errorMessage).toBe('Search criteria contains invalid characters');
    });
});

describe('patch(/video/rate) route:', () => {
    before(async () => {
        await setupDb.setupDbForTesting();
    });

    it('Should rate a video (like)', async () => {
        const video = (await Video.find({'name':'one'}));
        const id= video[0]._id;

        await supertest(app)
            .patch('/video/rate')
            .send({
                "_id": id,
                "rate": 1
            })
            .expect(200);

        const ratedVideo = await Video.findById(id);

        expect(ratedVideo.likes).toBe(video[0].likes+1);
    });

    it('Should rate a video (dislike)', async () => {
        const video = (await Video.find({'name':'one'}));
        const id= video[0]._id;

        await supertest(app)
            .patch('/video/rate')
            .send({
                "_id": id,
                "rate": '-1'
            })
            .expect(200);

        const ratedVideo = await Video.findById(id);

        expect(ratedVideo.dislikes).toBe(video[0].dislikes+1);
    });

    it('Should throw an error when rating an unexisting video', async () => {
        await supertest(app)
            .patch('/video/rate')
            .send({
                "_id": "613e391f43975ebc0526f354",
                "rate": '-1'
            })
            .expect(404);
    });

    it('Should throw an error when rate is not sent', async () => {
        await supertest(app)
            .patch('/video/rate')
            .send({
                "_id": "613e391f43975ebc0526f354"
            })
            .expect(400);
    });
});