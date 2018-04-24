/*
 * @Author: Kanishk 
 * @Date: 2018-04-24 11:54:53 
 * @Last Modified by: Kanishk
 * @Last Modified time: 2018-04-24 11:55:50
 */

const NoteSchema = {
    name: 'Note',
    properties: {
        'note': 'string'
    }
};

const SCHEMA_LIST = {
    Note: NoteSchema
};

export const getSchemaList = () => {
    return Object.keys(SCHEMA_LIST).map((key) => {
        return SCHEMA_LIST[key];
    })
};