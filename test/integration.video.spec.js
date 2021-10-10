const expect = require('expect');
const rewire = require('rewire');
const supertest = require('supertest');
const { log } = console;
// const app = require('../src/app');

xdescribe('saveVideo() function:', () => {
    xit('success', async () => {
        let revert;
        try {
            let infoSentToDB = [];
            const videoSaver = rewire('../src/db/video');
            const videoFromRequest = {
                "name": "Three",
                "description": "A simple test video",
                "uploader": "andres@andres.com",
                "uploadTstamp": 1633571825,
                "tags": "Three, TreS, tHird",
                "url": "https://static.filestackapi.com/v3/filestack.js"
            };
            const fakeSaveVideos = (listOfVideos) => { infoSentToDB = listOfVideos };

            revert = videoSaver.__set__({ 'saveVideos': fakeSaveVideos });

            const fakeFunctionToSave = videoSaver.__get__('saveVideo');

            fakeFunctionToSave(videoFromRequest);

            const savedVideo = infoSentToDB.pop();
            expect(savedVideo.name).toBe('Three');
            expect(savedVideo._id).toBeDefined();
        } catch (error) {
            log('Error in test:', error);
            throw error;
        } finally {
            if (revert) {
                revert();
            }
        }
    });

    it('should save a video successfully', async () => {
        const response = await supertest(app)
            .post('/video')
            .send({
                "name": "Some name video",
                "description": "Some short and precise desciption",
                "uploader": "pepe@email.com",
                "tags": ["tag1", "tag2"],
                "url": "https://static.filestackapi.com/v3/filestack.js"
            })
            .expect(201);

        expect(response.body.video._id).toBeDefined();
    })
});