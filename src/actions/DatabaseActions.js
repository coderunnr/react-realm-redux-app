/*
 * @Author: Kanishk 
 * @Date: 2018-04-24 11:55:04 
 * @Last Modified by: Kanishk
 * @Last Modified time: 2018-04-24 12:00:04
 */

import { NOTE_CREATED, NOTES_FETCH } from './types';
import { Actions } from 'react-native-router-flux'; 
import { create, read } from '../utils/database';
import { SCHEMA_LIST } from '../utils/database/schema';
// const Realm = require('realm');

// SCHEMA_LIST = {
//     Note: 'Note'
// };

// const NoteSchema = {
//     name: SCHEMA_LIST.Note,
//     properties: {
//         'note': 'string'
//     }
// }

// const openDatabase = () => {
//     return new Promise(function(resolve, reject) {
//         Realm.open({ schema: [NoteSchema]})
//         .then(realm => {
//             resolve(realm);
//         })
//         .catch((error) => {
//             reject(error);
//         });
//     });
    
// };

export const createNote = ({note}) => {
    return (dispatch) => {
        create(SCHEMA_LIST.Note, note)
        .then((record) => {
            dispatch({
                type: NOTE_CREATED,
                payload: record
            });
            Actions.reset('noteMain');
        });
    };
};

export const fetchNotes = () => {
    return (dispatch) => {
        read(SCHEMA_LIST.Note, '')
        .then((notes) => {
            dispatch({
                type: NOTES_FETCH,
                payload: Array.from(notes)
            });
        });
    };
};

