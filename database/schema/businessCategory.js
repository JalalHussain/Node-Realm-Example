const Realm = require('realm')
const  Promise = require('promise')

const BUSINESS_CATEGORY_SCHEMA = "business_category"
const BusinessCategorySchema ={
    name : BUSINESS_CATEGORY_SCHEMA,
    primaryKey: 'id',
    properties:{
        id:'int',
        name: {type: 'string', indexed: true},
        email: 'string',
        lastSynchronized: {type: 'date'},
        lastModified: {type: 'date'},
        isDeleted:{type: 'bool'},
        synchronizationId:{type: 'string'},
    }
}

const databaseOptions = {
    path: 'RealmInNodeJS.realm',
    schema: [BusinessCategorySchema],
    schemaVersion: 0,
}

const findAllBusinessCategories = () => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm => {
        let allBusinessCategories = realm.objects(BUSINESS_CATEGORY_SCHEMA)
        resolve(allBusinessCategories)
    }).catch((error) => {
        reject(error)
    })
})

module.exports ={
    findAllBusinessCategories
}