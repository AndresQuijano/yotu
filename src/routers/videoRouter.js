const express = require('express');
const validator = require('validator');
const Video = require('../models/videoModel');
const { validateAlphaNumeric, validateRate } = require('../utils/utils');
const { log } = console;

const router = new express.Router();

router.post('/video', async (req, res) => {
    try {
        const video = new Video(req.body);
        await video.save();
        res.status(201).send({ video });
    } catch (error) {
        log('Error in post/video:', error.message);
        res.status(400).send();
    }
});

router.get('/video/search/:criteria', async (req, res) => {
    try {
        validateAlphaNumeric(req.params.criteria, 'Search criteria', true, 100);

        const videos = await Video.find({
            $text: { $search: req.params.criteria }
        });
        res.status(200).send(videos);
    } catch (error) {
        log('Error in get/video:', error.message);
        res.status(400).send();
    }
});

router.get('/video/:id', async (req, res) => {
    try {
        if (!validator.isMongoId(req.params.id)) {
            return res.render('404', {
                'title':'Video not found'
            });
        }

        const _id = req.params.id;
        const video = await Video.findById({ _id });

        if(!video){
            return res.render('404', {
                'title':'Video not found'
            });
        }

        res.render('watch', video);
    } catch (error) {
        log('Error in get/video:', error.message);
        res.status(400).send();
    }
});

router.patch('/video/rate', async (req, res) => {
    try {
        validateRate(req.body);

        const video = await Video.findOne({ '_id': req.body._id });

        if (!video) {
            return res.status(404).send('Video not found');
        }

        if (req.body.like) {
            video.likes = parseInt(video.likes) + parseInt(req.body.like);
        }
        if (req.body.dislike) {
            video.dislikes = parseInt(video.dislikes) + parseInt(req.body.dislike);
        }

        video.save();

        res.status(200).send('Video successfully rated.');
    } catch (error) {
        log('Error in patch/video/rate');
        res.status(400).send();
    }
});

module.exports = { router };