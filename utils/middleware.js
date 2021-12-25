const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  logger.error('error: unknown endpoint')
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if(error instanceof SyntaxError){ // jsonbodyparser syntax error Handle SyntaxError here.
    console.log('json bodyparser data invalid')
    return response.status(500).send({data : "Invalid data"})
  }
  else if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('Saadaanko puuttuva urlista virhettä tähän? ')
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'invalid token'})
  }

  next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}