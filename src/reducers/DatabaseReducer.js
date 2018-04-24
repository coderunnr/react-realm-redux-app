/*
 * @Author: Kanishk 
 * @Date: 2018-04-24 11:55:12 
 * @Last Modified by:   Kanishk 
 * @Last Modified time: 2018-04-24 11:55:12 
 */

import { NOTE_CREATED, NOTES_FETCH } from '../actions/types';
const INITIAL_STATE = {
    notes: []
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch(action.type) {
        case NOTE_CREATED:
            return {...state};
        case NOTES_FETCH:
            return {...state, notes: action.payload};
        default:
            return state;
    }
};