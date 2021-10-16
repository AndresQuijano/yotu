const express = require('express');
const { log } = console;

const router = new express.Router();

router.get('/upload', async (req, res) => {
    res.render('upload', {
        'title': 'Upload a video'
    })
});

router.get('*', async (req, res) => {
    res.render('search', {
        'title': 'Search a video'
    })
});

module.exports = { router };