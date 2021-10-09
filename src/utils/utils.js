const validator = require('validator');

const CHARACTERS_TO_IGNORE=' .,;:¿?¡!';

const trimArray = (comaSeparatedString) => {
    let words = comaSeparatedString.split(',');
    return words.map(word => word.trim().toLowerCase());

};

const validateAlphaNumeric = (value, valueName, required, maxSize)=>{
    if(!required && !value){
        return true;
    }

    if (required && !value) {
        throw new Error(`${valueName} is required.`);
    }

    if (value.length > maxSize) {
        throw new Error(`${valueName} is too long. Max size is ${maxSize}`);
    }

    if (!validator.isAlphanumeric(value, 'es-ES', { 'ignore': CHARACTERS_TO_IGNORE })) {
        throw new Error(`${valueName}  contains invalid characters`);
    }

    return true;
}

const validateRate = (rate)=>{
    if(!rate){
        throw new Error('Rate is required');
    }

    if(rate!==1 && rate!==-1){
        throw new Error('Invalid rate');
    }

    return true;
};

module.exports = { trimArray, validateAlphaNumeric, validateRate };