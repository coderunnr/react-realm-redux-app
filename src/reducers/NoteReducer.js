import { NOTE_CHANGED } from '../actions/types';
const INITIAL_STATE = {
    note: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch(action.type) {
        case NOTE_CHANGED:
            return {...state, note: action.payload};
        default:
            return state;
    }
}