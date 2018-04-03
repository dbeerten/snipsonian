import conditionalCatch from './conditionalCatch';

describe('conditionalCatch()', () => {
    it('should execute a function if there are no errors', () => {
        expect(conditionalCatch({
            shouldCatchErrors: true,
            onError,
            actionToExecute: action,
        })).toBeTruthy();

        expect(conditionalCatch({
            shouldCatchErrors: false,
            onError,
            actionToExecute: action,
        })).toBeTruthy();
    });

    it('should catch and execute error handling logic when executing a function that fails', () => {
        expect(conditionalCatch({
            shouldCatchErrors: true,
            onError,
            actionToExecute: actionWithError,
        })).toBeInstanceOf(Error);
    });

    it('should throw an error when not catching bad logic', () => {
        expect(() => conditionalCatch({
            shouldCatchErrors: false,
            onError,
            actionToExecute: actionWithError,
        })).toThrow();
    });
});

function onError(error) {
    return new Error(error);
}

function action() {
    return true;
}

// This will throw a TypeError
function actionWithError() {
    const object = {};
    return object.undefinedProp.undefinedChildProp;
}
