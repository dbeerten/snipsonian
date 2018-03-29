import assert from './index';

describe('assert()', () => {
    it('throws an Error with the input errorMessage if the input validator returns false for the input val', () => {
        const input = 7;

        const shouldThrowError = () =>
            assert(input, isLargerThan10, `The input ${input} should be larger than 10.`);

        expect(shouldThrowError).toThrowError('The input 7 should be larger than 10.');
    });

    it('does not throw anything if the validator returns true', () => {
        const input = 14;

        const shouldNotThrow = () =>
            assert(input, isLargerThan10, `The input ${input} should be larger than 10.`);

        expect(shouldNotThrow).not.toThrow();
    });

    it('throws an Error with a generic errorMessage if errorMessage not provided as input', () => {
        const input = 7;

        const shouldThrowError = () =>
            assert(input, isLargerThan10);

        expect(shouldThrowError).toThrowError('Assertion error for value \'7\'.');
    });

    it('throws an Error if validator is not provided as input or is not a function', () => {
        const noValidator = () =>
            assert(7);

        expect(noValidator).toThrowError('Please provide a validator function.');

        const noFunctionValidator = () =>
            assert(7, 7);

        expect(noFunctionValidator).toThrowError('Please provide a validator function.');
    });

    function isLargerThan10(val) {
        return val > 10;
    }
});
