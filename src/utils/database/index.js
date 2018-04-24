/*
 * @Author: Kanishk 
 * @Date: 2018-04-24 11:54:43 
 * @Last Modified by: Kanishk
 * @Last Modified time: 2018-04-24 12:52:06
 */

const Realm = require('realm');
import { getSchemaList, SCHEMA_LIST } from './schema';


const openDatabase = () => {
    return new Promise(function(resolve, reject) {
        console.log(getSchemaList());
        Realm.open({ schema: [SCHEMA_LIST.Note] })
        .then(realm => {
            resolve(realm);
        })
        .catch((error) => {
            reject(error);
        });
    });  
};

/**
 * Manipulates the database (Create or Update)
 * @param {*} schema 
 * @param {*} params 
 * @param {*} isUpdate 
 */
export const manipulate = (schema, params, isUpdate) => {
    return new Promise( (resolve, reject) => {
        openDatabase()
        .then(realm => {
            return realm.write(() => {
                realm.create(schema.name, params, isUpdate);
            });
        })
        .then(record => {
            resolve(record);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

/**
 * Create a new record in the schema
 * @param {*} schema 
 * @param {*} params 
 */
export const create = (schema, params) => {

    return new Promise((resolve, reject) => {
        manipulate(schema, params, false)
        .then((record) => {
            resolve(record);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

/**
 * Perform a read of a record with filters
 * @param {*} schema 
 * @param {*} filters 
 */
export const read = (schema, filters) => {
    console.log(schema, filters);
    return new Promise((resolve, reject) => {
        openDatabase()
        .then(realm => {
            return realm.objects(schema.name);//.filtered(filters);
        })
        .then(record => {
            resolve(record);
        })
        .catch(error => {
            reject(error);
        });
    });
};

/**
 * Update the record in the database
 * @param {*} schema 
 * @param {*} params 
 */
export const update = (schema, params) => {

    return new Promise((resolve, reject) => {
        manipulate(schema, params, true)
        .then(record => {
            resolve(record);
        })
        .catch(error => {
            reject(error);
        });
    });
};

export const remove = (schema, filters) => {

    return new Promise((resolve, reject) => {
        openDatabase()
        .then(realm => {
            return delete(realm.objects(schema.name).filtered(filters));
        })
        .then(() => {
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
};

