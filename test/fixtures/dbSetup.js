const mongoose = require('mongoose');
const Video = require('../../src/models/videoModel');

const videoOneId = new mongoose.Types.ObjectId();

const setupDbForTesting = async () => {
    await Video.deleteMany();

    let video = new Video({
        "_id": videoOneId,
        "name": "one",
        "description":"First test video",
        "uploader": "andres@andres.com",
        "tags": ["uno", "primero", "first"],
        "url": "https://static.filestackapi.com/v3/filestack1.js"
    });
    await video.save();

    video = new Video({
        "name": "tWo",
        "description": "About a cat",
        "uploader": "camila@camila.com",
        "tags": ["dos", "second", "segundo"],
        "url": "https://static.filestackapi.com/v3/filestack2.js"
    });
    await video.save();

    video = new Video({
        "name": "Three",
        "description": "A bird playing with a fish",
        "uploader": "andres@andres.com",
        "url": "https://static.filestackapi.com/v3/filestack3.js"
    });
    await video.save();
};

module.exports = { setupDbForTesting, videoOneId };