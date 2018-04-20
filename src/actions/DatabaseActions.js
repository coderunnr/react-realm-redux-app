import { NOTE_CREATED, NOTES_FETCH } from './types';
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
            this.realmDB = realm;
            console.log(this.realmDB);
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
            this.realmDB = realm;
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