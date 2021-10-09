const expect = require('expect');
const rewire = require('rewire');
const { log } = console;

describe('saveVideo() function:', () => {
    it('success', async () => {
        let revert;
        try {
            let infoSentToDB=[];
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
});