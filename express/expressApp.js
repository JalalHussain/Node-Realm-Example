const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const {findAllCities, insertNewCity} = require('../database/schema/city')

app.get('/',(request, response)=>{
    response.setHeader('Content-Type', 'application/json');
    response.send({
        status: "success",
        name: "Jalal Hussain",
        sms: "The is root path for Realm Example Project"
    })
})

app.get('/allCities',(request, response)=>{
    response.setHeader('Content-Type', 'application/json');
    findAllCities().then((allUsers) => {
        response.send(JSON.stringify(allUsers))
    }).catch((error) => {
        response.send(error)
    })

})


app.post('/insert-new-city',(request, response) => {
    let cityFromRequest = request.body
    console.log(cityFromRequest );
    response.setHeader('Content-Type', 'application/json')
    insertNewCity(cityFromRequest).then(insertedCity => {
        response.send({
            status:"success",
            message: "Inserted new city Successfully",
            data: insertedCity
        })

    }).catch((error) => {
        response.send({
            status:"failed",
            message: `Insert new city error: ${error}`
        })
    })
})

module.exports ={
    app
}