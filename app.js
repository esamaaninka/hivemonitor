const express = require('express')
var bodyParser = require('body-parser')

const cors = require('cors')
const hivelogRouter = require('./controllers/hivelog')
const hiveRouter = require('./controllers/hive')
//const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()
app.use(bodyParser.json())

/* this for enabling test db cleanup see Fullstack2020 bloglist
if ( config.TEST_MODE === 'test') {  
  const testingRouter = require('./controllers/testing')  
  app.use('/api/testing', testingRouter)
}
*/
const mongoose = require('mongoose')

logger.info('Connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
//app.use(express.static('build')) //NOT BUILT YET
app.use(express.json())
app.use(middleware.requestLogger)
app.use('', hivelogRouter)
app.use('',hiveRouter) // vai pitäiskö tässä olla ('/api/users') kuten notes esimerkissä? miksi yo toimii ilman ?
//app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
