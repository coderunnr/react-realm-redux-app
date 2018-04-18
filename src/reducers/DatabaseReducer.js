import { NOTE_CREATED, NOTES_FETCH } from '../actions/types';
const INITIAL_STATE = {
    notes: []
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch(action.payload) {
        case NOTE_CREATED:
            return {...state};
        case NOTES_FETCH:
            return {...state, notes: action.payload};
        default:
            return state;
    }
};