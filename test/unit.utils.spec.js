const expect = require('expect');
const { log } = console;
const { validateAlphaNumeric, validateRate } = require('../src/utils/utils');

describe('Function validateAlphaNumeric', () => {
    it('Should pass with correct name', () => {
        try {
            const result = validateAlphaNumeric("A correct name. Dots, comas are allowed!",
                "Name", true, 100)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with spanish characters like ñ', () => {
        try {
            const result = validateAlphaNumeric("El video de Ñoñito papá.",
                "Name", true, 100)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with not required field', () => {
        try {
            const result = validateAlphaNumeric(undefined, "Description", false, 100)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with required field when sent undefined', () => {
        try {
            expect(() => validateAlphaNumeric(undefined, "Name", true, 100))
                .toThrow('Name is required');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail when size is longer than expected', () => {
        try {
            expect(() => validateAlphaNumeric("A very long name", "Name", true, 10))
                .toThrow('Name is too long. Max size is 10');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail when special characters are sent', () => {
        try {
            expect(() => validateAlphaNumeric("Vid$o nam&", "Name", true, 100))
                .toThrow('Name contains invalid characters');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });
});

describe('Function validateRate', () => {
    it('Should pass with 1 and undefined', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': '1'
            };
            const result = validateRate(rate)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with undefined and -1', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'dislike': '-1'
            };
            const result = validateRate(rate)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with 1 and -1', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': '1',
                'dislike': '-1'
            };
            const result = validateRate(rate)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with -1 and 1', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': '-1',
                'dislike': '1'
            };
            const result = validateRate(rate)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with 1 and 0', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': '1',
                'dislike': '0'
            };
            const result = validateRate(rate)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with 0 and -1', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': '0',
                'dislike': '-1'
            };
            const result = validateRate(rate)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with undefined', () => {
        try {
            expect(() => validateRate())
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with invalid _id', () => {
        try {
            const rate = {
                '_id': 'invalidmongoid'
            };
            expect(() => validateRate(rate))
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail if like/dislike when like/dislike are undefined', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44'
            };
            expect(() => validateRate(rate))
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with 0 and undefined', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': 0
            };
            expect(() => validateRate(rate))
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with undefined and 0', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'dislike': 0
            };
            expect(() => validateRate(rate))
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with 2 and undefined', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': 2
            };
            expect(() => validateRate(rate))
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with undefined and -3', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'dislike': -3
            };
            expect(() => validateRate(rate))
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with 1 and 1', () => {
        try {
            const rate = {
                '_id': '616792a23ace9f7c77ecce44',
                'like': 1,
                'dislike': 1
            };
            expect(() => validateRate(rate))
                .toThrow('400. Bad request');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });
});