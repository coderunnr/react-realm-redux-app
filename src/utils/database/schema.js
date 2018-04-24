/*
 * @Author: Kanishk 
 * @Date: 2018-04-24 11:54:53 
 * @Last Modified by: Kanishk
 * @Last Modified time: 2018-04-24 12:15:47
 */

const NoteSchema = {
    name: 'Note',
    properties: {
        'note': 'string'
    }
};

export const SCHEMA_LIST = {
    Note: NoteSchema
};

export const getSchemaList = () => {
    return Object.keys(SCHEMA_LIST).map((key) => {
        return SCHEMA_LIST[key];
    });
};