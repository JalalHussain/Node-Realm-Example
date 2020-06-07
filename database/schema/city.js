const Realm = require('realm')
const  Promise = require('promise')

const CITY_SCHEMA = "city"
const CitySchema ={
    name : CITY_SCHEMA,
    primaryKey: 'id',
    properties:{
        id:'int',
        name: {type: 'string', indexed: true},
        isDeleted: {type: 'bool'},
        lastSynchronized: {type: 'date'},
        lastModified: {type: 'date'},
        synchronizationId:{type: 'string'},
    }
}

const databaseOptions = {
    path: 'RealmInNodeJS.realm',
    schema: [CitySchema],
    schemaVersion: 0,
}

const findAllCities = () => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm => {
        let allCities = realm.objects(CITY_SCHEMA)
        resolve(allCities)
    }).catch((error) => {
        reject(error)
    })
})

const insertNewCity = newCity => new Promise((resolve, reject )=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(() =>{
            newCity.id=Math.floor(Date.now())
            realm.create(CITY_SCHEMA, newCity)
            resolve(newCity)
        } )
    }).catch((error) => reject(error))
})

module.exports ={
    findAllCities, insertNewCity
}