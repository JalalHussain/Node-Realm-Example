const Realm = require('realm')
const  Promise = require('promise')

const COMPANY_SCHEMA = "company"
const CompanySchema ={
    name : COMPANY_SCHEMA,
    primaryKey: 'id',
    properties:{
        id:'int',
        name: {type: 'string', indexed: true},
        mobileNumber: {type: 'string'},
        businessCategoryId: {type: 'string'},
        suitNumber: {type: 'string'},
        marketName: {type: 'string'},
        streetAddress: {type: 'string'},
        cityId: {type: 'string'},
        latitude: {type: 'double'},
        longitude: {type: 'double'},
        lastSynchronized: {type: 'date'},
        lastModified: {type: 'date'},
        isDeleted:{type: 'bool'},
        synchronizationId:{type: 'string'},
    }
}
const databaseOptions = {
    path: 'RealmInNodeJS.realm',
    schema: [CompanySchema],
    schemaVersion: 0,
}

const findAllCompanies = () => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm => {
        let allCompanies = realm.objects(COMPANY_SCHEMA)
        resolve(allCompanies)
    }).catch((error) => {
        reject(error)
    })
})

module.exports ={
    findAllBusinessCategories
}