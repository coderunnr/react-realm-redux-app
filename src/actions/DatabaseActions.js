import { NOTE_CREATED, NOTES_FETCH, RECORD_CREATED, RECORD_READ, RECORD_UPDATED, RECORD_DELETED } from './types';
import { Actions } from 'react-native-router-flux'; 
const Realm = require('realm');

SCHEMA_LIST = {
    Note: 'Note'
};

const NoteSchema = {
    name: SCHEMA_LIST.Note,
    properties: {
        'note': 'string'
    }
}

const openDatabase = () => {
    return new Promise(function(resolve, reject) {
        Realm.open({ schema: [NoteSchema]})
        .then(realm => {
            resolve(realm);
        })
        .catch((error) => {
            reject(error);
        });
    });
    
};

export const createNote = ({note}) => {
    return (dispatch) => {
        openDatabase()
        .then((realm) => {
            realm.write(() => {
                const noteRecord = realm.create(SCHEMA_LIST.Note,{
                    note
                });
            });
        })
        .then(() => {
            dispatch({
                type: NOTE_CREATED
            });
            Actions.reset('noteMain');
        });
    };
};

export const fetchNotes = () => {
    return (dispatch) => {
        openDatabase()
        .then((realm) => {
            return realm.objects(SCHEMA_LIST.Note);
        })
        .then((notes) => {
            dispatch({
                type: NOTES_FETCH,
                payload: Array.from(notes)
            });
        });
    }
};

/**
 * Manipulates the database (Create or Update)
 * @param {*} schema 
 * @param {*} params 
 * @param {*} isUpdate 
 */
export const manipulate = (schema, params, isUpdate) => {
    return new Promise( (resolve, reject) => {
        openDatabase()
        .then(realm => {
            return realm.write(() => {
                realm.create(schema, {
                    params
                }, isUpdate);
            });
        })
        .then(record => {
            resolve(record);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

/**
 * Create a new record in the schema
 * @param {*} schema 
 * @param {*} params 
 */
export const create = (schema, params) => {

    return new Promise((resolve, reject) => {
        manipulate(schema, params, false)
        .then((record) => {
            dispatch({
                type: RECORD_CREATED,
                payload: record
            });
            resolve(record);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

/**
 * Perform a read of a record with filters
 * @param {*} schema 
 * @param {*} filters 
 */
export const read = (schema, filters) => {

    return new Promise((resolve, reject) => {
        openDatabase()
        .then(realm => {
            return realm.objects(schema).filtered(filters);
        })
        .then(record => {
            dispatch({
                type: RECORD_READ,
                payload: record
            });
            resolve(record);
        })
        .catch(error => {
            reject(error);
        });
    });
};

/**
 * Update the record in the database
 * @param {*} schema 
 * @param {*} params 
 */
export const update = (schema, params) => {

    return new Promise((resolve, reject) => {
        manipulate(schema, params, true)
        .then(record => {
            dispatch({
                type: RECORD_UPDATED,
                payload: record
            });
            resolve(record);
        })
        .catch(error => {
            reject(error);
        });
    });
};

export const remove = (schema, filters) => {

    return new Promise((resolve, reject) => {
        openDatabase()
        .then(realm => {
            return delete(realm.objects(schema).filtered(filters));
        })
        .then(() => {
            dispatch({
                type: RECORD_DELETED,
            });
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
}

