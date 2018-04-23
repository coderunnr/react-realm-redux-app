import { NOTE_CREATED, NOTES_FETCH, RECORD_CREATED } from './types';
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
 * Create a Record in Database
 */
export const create = (schema, params, OnSuccess) => {
    return (dispatch) => {
        openDatabase()
        .then( realm => {
            return realm.write(() => {
                realm.create(schema, {
                    params
                });
            });
        })
        .then((record) => {
            dispatch({
                type: RECORD_CREATED,
                payload: record
            });
            if (OnSuccess) {
                OnSuccess();
            }
        })
        .catch((error) => {
            throw new Error(error);
        });
    }
};

export const read = (schema)