import { combineReducers } from 'redux';
import DatabaseReducer from './DatabaseReducer';
import NoteReducer from './NoteReducer';

export default combineReducers({
    database: DatabaseReducer,
    note: NoteReducer
});