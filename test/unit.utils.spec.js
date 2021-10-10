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
    it('Should pass with 1', () => {
        try {
            const result = validateRate(1)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should pass with -1', () => {
        try {
            const result = validateRate(-1)
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });


    it("Should pass with '-1'", () => {
        try {
            const result = validateRate('-1')
            expect(result).toBe(true);
        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with undefined', () => {
        try {
            expect(() => validateRate())
                .toThrow('Rate is required');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });

    it('Should fail with 2', () => {
        try {
            expect(() => validateRate(2))
                .toThrow('Invalid rate');

        } catch (error) {
            log('Error in test:', error);
            throw error;
        }
    });
});