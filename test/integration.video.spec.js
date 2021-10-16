const expect = require('expect');
const supertest = require('supertest');
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
                'name': 'Some name video',
                'description': 'Some short and precise desciption',
                'uploader': 'pepe@email.com',
                'tags': ['tag1', 'tag2', '', ''],
                'url': 'https://static.filestackapi.com/v3/filestack4.js'
            })
            .expect(201);

        const savedVideo = await Video.findById(response.body.video._id);

        expect(response.body.video._id).toBeDefined();
        expect(savedVideo.tags.length).toBe(2);
    });

    it('Should throw an error if validation fails (email)', async () => {
        const response = await supertest(app)
            .post('/video')
            .send({
                'name': 'Some name',
                'description': 'Some short and precise desciption',
                'uploader': 'pepe-email.com',
                'tags': ['tag1', 'tag2'],
                'url': 'https://static.filestackapi.com/v3/filestack.js'
            })
            .expect(400);

        expect(response.body.errorMessage).toBe('Video validation failed: uploader: Email is invalid');
    });

    it('Should throw an error if validation fails (URL)', async () => {
        const response = await supertest(app)
            .post('/video')
            .send({
                'name': 'Name',
                'description': 'Some short and precise desciption',
                'uploader': 'pepe@email.com',
                'tags': ['tag1', 'tag2'],
                'url': 'httpsstaticfilestackapicomv3filestackjs'
            })
            .expect(400);

        expect(response.body.errorMessage).toBe('Video validation failed: url: URL is invalid');
    });
});

describe('get(/video/:searchCriteria) route:', () => {
    before(async () => {
        await setupDb.setupDbForTesting();
    });

    it('Should find video by name', async () => {
        const response = await supertest(app)
            .get('/video/search/one')
            .expect(200);

        expect(response.body[0].name).toBe('one');
    });

    it('Should find video by tag', async () => {
        const response = await supertest(app)
            .get('/video/search/second')
            .expect(200);

        expect(response.body[0].tags.includes('second')).toBe(true);
    });

    it('Should find video by description', async () => {
        const response = await supertest(app)
            .get('/video/search/fish')
            .expect(200);

        expect(response.body[0].description).toBe('A bird playing with a fish');
    });

    it('Should find video by uploader', async () => {
        const response = await supertest(app)
            .get('/video/search/andres')
            .expect(200);

        expect(response.body.length).toBe(2);
    });

    it('Should validate special characters in criteria', async () => {
        const response = await supertest(app)
            .get('/video/search/fal$eCiter&a')
            .expect(400);

        expect(response.body.errorMessage).toBe('Search criteria contains invalid characters');
    });
});

describe('get(/video/:id) route:', () => {
    before(async () => {
        await setupDb.setupDbForTesting();
    });

    it('Should find video by id', async () => {
        const response = await supertest(app)
            .get(`/video/${setupDb.videoOneId}`)
            .expect(200);

        expect(response.text).toContain('src="https://static.filestackapi.com/v3/filestack1.js" type="video/mp4"');
        expect(response.text).toContain('one');
        expect(response.text).toContain('andres@andres.com');
        expect(response.text).toContain('First test video');
    });

    it('Should throw an error if id is invalid', async () => {
        const response = await supertest(app)
            .get(`/video/thisisaninvalidid`)
            .expect(400);
    });
});

describe('patch(/video/rate) route:', () => {
    before(async () => {
        await setupDb.setupDbForTesting();
    });

    it('Should rate a video (like)', async () => {
        const videoBefore = (await Video.findById(setupDb.videoOneId));

        await supertest(app)
            .patch('/video/rate')
            .send({
                '_id': setupDb.videoOneId,
                'like': 1
            })
            .expect(200);

        const videoAfter = await Video.findById(setupDb.videoOneId);

        expect(videoAfter.likes).toBe(videoBefore.likes + 1);
    });

    it('Should rate a video (dislike)', async () => {
        const videoBefore = (await Video.findById(setupDb.videoOneId));

        await supertest(app)
            .patch('/video/rate')
            .send({
                '_id': setupDb.videoOneId,
                'dislike': '1'
            })
            .expect(200);

        const videoAfter = await Video.findById(setupDb.videoOneId);

        expect(videoAfter.dislikes).toBe(videoBefore.dislikes + 1);
    });

    it('Should rollback a dislike (dislike)', async () => {
        const videoBefore = (await Video.findById(setupDb.videoOneId));

        await supertest(app)
            .patch('/video/rate')
            .send({
                '_id': setupDb.videoOneId,
                'dislike': '-1'
            })
            .expect(200);

        const videoAfter = await Video.findById(setupDb.videoOneId);

        expect(videoAfter.dislikes).toBe(videoBefore.dislikes - 1);
    });

    it('Should rollback a like and add a dislike all at once', async () => {
        const videoBefore = (await Video.findById(setupDb.videoOneId));

        await supertest(app)
            .patch('/video/rate')
            .send({
                '_id': setupDb.videoOneId,
                'like':1,
                'dislike': '-1'
            })
            .expect(200);

        const videoAfter = await Video.findById(setupDb.videoOneId);

        expect(videoAfter.dislikes).toBe(videoBefore.dislikes - 1);
        expect(videoAfter.likes).toBe(videoBefore.likes + 1);
    });

    it('Should throw an error when rating an unexisting video', async () => {
        await supertest(app)
            .patch('/video/rate')
            .send({
                '_id': '613e391f43975ebc0526f354',
                'like': '-1'
            })
            .expect(404);
    });

    it('Should throw an error when like/dislike are not sent', async () => {
        await supertest(app)
            .patch('/video/rate')
            .send({
                '_id': '613e391f43975ebc0526f354'
            })
            .expect(400);
    });
});

