/*
 * @Author: Kanishk 
 * @Date: 2018-04-24 11:55:04 
 * @Last Modified by: Kanishk
 * @Last Modified time: 2018-04-24 12:55:54
 */

import { NOTE_CREATED, NOTES_FETCH } from './types';
import { Actions } from 'react-native-router-flux'; 
import { create, read } from '../utils/database';
import { SCHEMA_LIST } from '../utils/database/schema';

export const createNote = ({note}) => {
    return (dispatch) => {
        create(SCHEMA_LIST.Note, {note})
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
        console.log(SCHEMA_LIST.Note);
        
        read(SCHEMA_LIST.Note, '')
        .then((notes) => {
            dispatch({
                type: NOTES_FETCH,
                payload: Array.from(notes)
            });
        });
    };
};

