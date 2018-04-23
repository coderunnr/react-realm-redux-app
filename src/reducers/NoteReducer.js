import { NOTE_CHANGED, NOTE_CREATED } from '../actions/types';
const INITIAL_STATE = {
    note: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch(action.type) {
        case NOTE_CHANGED:
            return {...state, note: action.payload};
        case NOTE_CREATED:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}