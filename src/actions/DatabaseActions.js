import { NOTE_CREATED, NOTES_FETCH } from './types';
import { Actions } from 'react-redux';
const Realm = require('realm');

let SCHEMA_LIST = {
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

const closeDatabase = () => {
    realmDB.close();
}

export const createNote = ({note}) => {
    return (dispatch) => {
        let realmDB;
        openDatabase()
        .then((realm) => {
            this.realmDB =realm;
            console.log(this.realmDB);
            return realm.write(() => {
                const noteRecord = realm.create(SCHEMA_LIST.Note,{
                    note
                });
            });
        })
        .then(() => {
            dispatch({
                type: NOTE_CREATED
            });
            closeDatabase(realmDB);    
        });
    };
};

export const fetchNotes = () => {
    return (dispatch) => {
        let realmDB;
        openDatabase()
        .then((realm) => {
            this.realmDB = realm;
            return realm.objects(SCHEMA_LIST.Note);
        })
        .then((notes) => {
            dispatch({
                type: NOTES_FETCH,
                payload: Array.from(notes)
            });
            closeDatabase(realmDB);
        });
    }
};