const mongoose = require('mongoose');
const validator = require('validator');
const { validateAlphaNumeric } = require('../utils/utils');
const { log } = console;

const MAX_LENGTH_VIDEO_NAME = 100;
const MAX_LENGTH_VIDEO_DESCRIPTION = 500;
const MAX_LENGTH_VIDEO_TAG = 30;

const videoSchema = mongoose.Schema({
    'name': {
        'type': String,
        'required': true,
        'trim': true,
        validate(value) {
            validateAlphaNumeric(value, 'Name', true, MAX_LENGTH_VIDEO_NAME);
            // if (!validator.isAlphanumeric(value, 'es-ES', { 'ignore': ' .,;:¿?¡!' })) {
            //     throw new Error('Name contains invalid characters.');
            // }

            // if (value.length > MAX_LENGTH_VIDEO_NAME) {
            //     throw new Error(`Name too long. Max size allowed is ${MAX_LENGTH_VIDEO_NAME}.`);
            // }
        }
    },
    'description': {
        'type': String,
        'trim': true,
        validate(value) {
            validateAlphaNumeric(value, 'Description', false, MAX_LENGTH_VIDEO_DESCRIPTION);
            // if (!validator.isAlphanumeric(value, 'es-ES', { 'ignore': ' .,;:¿?¡!' })) {
            //     throw new Error('Description contains invalid characters.');
            // }

            // if (value.length > ) {
            //     throw new Error(`Description too long. Max size allowed is ${MAX_LENGTH_VIDEO_DESCRIPTION}.`);
            // }
        }
    },
    'url': {
        'type': String,
        'required': true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('URL is invalid');
            }
        }
    },
    'uploader': {
        'type': String,
        'required': true,
        'trim': true,
        'lowercase': true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    'tags': {
        'type': Array,
        validate(value) {
            value.forEach((tag) => {
                validateAlphaNumeric(tag, 'Tag', false, MAX_LENGTH_VIDEO_TAG);
                // if (!validator.isAlphanumeric(tag, 'es-ES', { 'ignore': ' .,;:¿?¡!' })) {
                //     throw new Error('Tags contains invalid characters.');
                // }
            });
        }
    },
    'likes': {
        'type': Number,
        'default': 0
    },
    'dislikes': {
        'type': Number,
        'default': 0
    }
},
    {
        'timestamps': true//Fill the creation and update timestamps for every video automatically
    });

videoSchema.index({
    'name': 'text',
    'description': 'text',
    'uploader': 'text',
    'tags': 'text'
});

videoSchema.pre('save', async function (next) {
    // const video = this;

    //Delete empty tags
    if (this.tags) {
        this.tags = this.tags.filter((tag) => tag.length > 0);
    }

    next();
});

const Video = mongoose.model('Video', videoSchema);
Video.createIndexes();

module.exports = Video;