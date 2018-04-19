import { NOTE_CHANGED } from '../actions/types';

export const noteChanged = ({ note }) => {
    return {
        type: NOTE_CHANGED,
        payload: note
    };
};


