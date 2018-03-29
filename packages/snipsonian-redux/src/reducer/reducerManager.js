import assert from '../../../snipsonian-core/src/assert';
import isSet from '../../../snipsonian-core/src/is/isSet';
import createReducer from './createReducer';
import { STATE_STORAGE_TYPE, REDUCER_STORAGE_TYPE } from '../config/storageType';

const reducerConfigs = [];

const registeredReducers = {};

export function registerReducer({
    key,
    initialState = {},
    actionHandlers = {},
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT,
}) {
    assert(key, isSet, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        initialState,
        actionHandlers,
        reducerStorageType,
    });

    registeredReducers[key] = createReducer({
        initialState,
        actionHandlers,
    });

    return registeredReducers[key];
}

export function registerStorageTypeForProvidedReducer({
    key,
    reducerStorageType = REDUCER_STORAGE_TYPE.INHERIT,
}) {
    assert(key, isSet, 'Invalid key {val}');
    assert(key, isReducerKeyUnique, 'There is already another reducer registered with the key {val}');

    reducerConfigs.push({
        key,
        reducerStorageType,
    });
}

export function getRegisteredReducers() {
    return registeredReducers;
}

export function getCombinedInitialState() {
    const initialValue = {};

    return reducerConfigs
        .reduce(
            (accumulator, reducerConfig) => {
                // redux-first-router needs initial state to be undefined. TBD why.
                const initialStateCopy = typeof reducerConfig.initialState === 'undefined' ?
                    undefined : Object.assign({}, reducerConfig.initialState);
                // eslint-disable-next-line no-param-reassign
                accumulator[reducerConfig.key] = initialStateCopy;

                return accumulator;
            },
            initialValue,
        );
}

export function areThereReducersWithoutStorageTypeInherit() {
    return reducerConfigs
        .some(hasNotStorageTypeInherit);
}

export function areThereReducersThatHaveToBeStoredSpecifically() {
    return reducerConfigs
        .some((reducerConfig) => hasNotStorageTypeInherit(reducerConfig) && hasNotStorageTypeNoStorage(reducerConfig));
}

export function getMapOfReducersThatHaveToBeStoredSpecifically({ stateStorageType }) {
    const initialValue = {};

    return reducerConfigs
        .reduce(
            (accumulator, reducerConfig) => {
                if (stateStorageType === STATE_STORAGE_TYPE.NO_STORAGE) {
                    if (hasNotStorageTypeInherit(reducerConfig)
                        && hasNotStorageTypeNoStorage(reducerConfig)) {
                        addReducerToMap(reducerConfig.reducerStorageType);
                    }
                } else if (hasStorageTypeInherit(reducerConfig)) {
                    addReducerToMap(stateStorageType);
                } else if (hasNotStorageTypeNoStorage(reducerConfig)) {
                    addReducerToMap(reducerConfig.reducerStorageType);
                }

                function addReducerToMap(storageType) {
                    // eslint-disable-next-line no-param-reassign
                    accumulator[reducerConfig.key] = storageType;
                }

                return accumulator;
            },
            initialValue,
        );
}

function findReducerConfig(key) {
    return reducerConfigs
        .find((reducerConfig) => reducerConfig.key === key);
}

function isReducerKeyUnique(key) {
    return typeof findReducerConfig(key) === 'undefined';
}

function hasStorageTypeInherit(reducerConfig) {
    return reducerConfig.reducerStorageType === REDUCER_STORAGE_TYPE.INHERIT;
}

function hasNotStorageTypeInherit(reducerConfig) {
    return !hasStorageTypeInherit(reducerConfig);
}

function hasNotStorageTypeNoStorage(reducerConfig) {
    return reducerConfig.reducerStorageType !== REDUCER_STORAGE_TYPE.NO_STORAGE;
}
