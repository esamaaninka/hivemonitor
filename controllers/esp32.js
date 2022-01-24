//const bcrypt = require('bcrypt')
const esp32Router = require('express').Router()
const res = require('express/lib/response')

//esp32Router.get('/esp32', async (request, response, next) => {
esp32Router.get('/esp32', function ( req, res ){
    console.log('requesting ESP32 from http://192.168.1.107')
    //response.status(200).json("OK")
    return res.redirect(302,'http://192.168.1.107/dht')
})

esp32Router.get('/esp32/temp', function (req, res){
    console.log('requesting ESP32 temp')
    return res.redirect(302,'http://192.168.1.107/temperature')
})
esp32Router.get('/esp32/hum', function (req, res){
    console.log('requesting ESP32 humidity')
    return res.redirect(302,'http://192.168.1.107/humidity')
})
module.exports = esp32Router