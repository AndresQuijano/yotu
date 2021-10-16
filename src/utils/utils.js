const validator = require('validator');

const CHARACTERS_TO_IGNORE = ' .,;:¿?¡!\'';

// const trimArray = (comaSeparatedString) => {
//     let words = comaSeparatedString.split(',');
//     return words.map(word => word.trim().toLowerCase());

// };

const validateAlphaNumeric = (value, valueName, required, maxSize) => {
    if (!required && !value) {
        return true;
    }

    if (required && !value) {
        throw new Error(`${valueName} is required.`);
    }

    if (value.length > maxSize) {
        throw new Error(`${valueName} is too long. Max size is ${maxSize}`);
    }

    if (!validator.isAlphanumeric(value, 'es-ES', { 'ignore': CHARACTERS_TO_IGNORE })) {
        throw new Error(`${valueName} contains invalid characters`);
    }

    return true;
}

const validateRate = (rate) => {
    if (!rate) {
        throw new Error('400. Bad request');
    }

    if (!validator.isMongoId(rate._id)) {
        throw new Error('400. Bad request');
    }

    if (!rate.like && !rate.dislike) {
        throw new Error('400. Bad request');
    }

    const likeValue = rate.like ? rate.like : 0;
    const dislikeValue = rate.dislike ? rate.dislike : 0;

    if ((Math.abs(likeValue) > 1) || (Math.abs(dislikeValue) > 1)
        || (likeValue === dislikeValue)) {
        throw new Error('400. Bad request');
    }

    return true;
};

module.exports = { /*trimArray,*/ validateAlphaNumeric, validateRate };