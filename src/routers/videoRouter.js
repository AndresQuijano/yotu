const express = require('express');
const Video = require('../models/videoModel');
const { validateAlphaNumeric, validateRate } = require('../utils/utils');
const { log } = console;

const router = new express.Router();

router.post('/video', async (req, res) => {
    try {
        const video = new Video(req.body);
        await video.save();
        res.status(201).send({video});
    } catch (error) {
        log('Error in post/video:', error.message);
        res.status(400).send({'errorMessage':error.message});
    }
});

router.get('/video/:criteria', async (req, res) => {
    try {
        validateAlphaNumeric(req.params.criteria, 'Search criteria', true, 100);

        const videos = await Video.find({
            $text: { $search: req.params.criteria }
        });
        res.status(200).send(videos);
    } catch (error) {
        log('Error in get/video:', error.message);
        res.status(400).send({'errorMessage':error.message});
    }
});

router.patch('/video/rate', async (req, res) => {
    try {
        validateRate(req.body.rate);

        const video = await Video.findOne({ '_id': req.body._id });

        if(!video){
            return res.status(404).send('Video not found');
        }

        if(req.body.rate===1){
            video.likes += 1;
        }else{
            video.dislikes += 1;
        }

        video.save();

        res.status(200).send('Video successfully rated.');
    } catch (error) {
        log('Error in patch/video/rate');
        res.status(400).send(error.message);
    }
});

module.exports = { router };