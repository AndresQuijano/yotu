const fs = require('fs');
const {v4:uuid}=require('uuid');
const { log } = console;


const saveVideo = async (video) => {
    const videos = loadVideos();

    video.tags = cleanArray(video.tags);
    video._id=uuid();

    videos.push(video);

    saveVideos(videos);
};

const getVideos = async (criteria) => {
    let searchWords = cleanArray(criteria);

    const videos = loadVideos();

    return videos.filter((video) =>
        (searchWords.includes(video.name)) ||
        (-1 < video.tags.findIndex((tag) => searchWords.includes(tag)))
    );
};

const cleanArray = (criteriaString) => {
    let words = criteriaString.split(',');
    return words.map(word => word.trim().toLowerCase());

};

const loadVideos = () => {
    try {
        const dataBuffer = fs.readFileSync('src/db/videosDB.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
};

const saveVideos = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('src/db/videosDB.json', dataJson);
};

module.exports = { saveVideo, getVideos };