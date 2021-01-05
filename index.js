const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const https =  require('https')
const fs = require('fs')
const config = require('./utils/config')
const logger = require('./utils/logger')

var key = fs.readFileSync( '/etc/ssl/private/apache-selfsigned.key');
var cert = fs.readFileSync('/etc/ssl/certs/apache-selfsigned.crt');
var options = {
  key: key,
  cert: cert
}

const httpServer = http.createServer(app)
const httpsServer = https.createServer(options, app)


const httpPORT = config.HTTP_PORT  || 8080
httpServer.listen(httpPORT, () => {
  logger.info(`HTTP Server running on port ${httpPORT}`)
})

const httpsPORT = config.HTTPS_PORT  || 8443
httpsServer.listen(httpsPORT, () => {
  logger.info(`HTTPS Server running on port ${httpsPORT}`)
})