const expect = require('expect');
const supertest = require('supertest');
const app = require('../src/app');

describe('General router:', () => {
    it('Should render upload view', async () => {
        const response = await supertest(app)
            .get('/upload')
            .expect(200);

        expect(response.text).toContain('<h1>Upload a video</h1>');
        expect(response.text).toContain('<button>Upload</button>');
    });

    it('Should render search view', async () => {
        const response = await supertest(app)
            .get('/search')
            .expect(200);

        expect(response.text).toContain('Search a video');
    });
});