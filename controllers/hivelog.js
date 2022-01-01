//const jwt = require('jsonwebtoken')
const hivelogRouter = require('express').Router()
const HiveLog = require('../models/hivelog')
const Hive = require('../models/hive')

// strip the token from the request
/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

hivelogRouter.get('/api/hivelogs/', async (request, response) => {
  // const hivelogs = await HiveLog
  HiveLog
    .find({})
    .populate('hive', { hivename: 1, queen: 1 })
    .then(c => {
      response.json(c.map(p => p.toJSON()))
    })
  //response.json(hivelogs)
})

hivelogRouter.get('/api/hivelogs/:hivename', async (request, response, next) => {
  console.log('hivelogRouter GET by name: ', request.params.hivename)

  // get first all logs, populate with hivename, and filter with given name

  HiveLog
    .find({})
    .populate('hive', { hivename: 1 })
    .then(logs => {
      response.json(logs.filter(l => l.hive.hivename === request.params.hivename))
    })
    .catch(error => next(error))
})
hivelogRouter.get('/api/hivelogs/id/:id', async (request, response, next) => {
  
  HiveLog
    .find({})
    .populate('hive', { hivename: 1, id: 1 })
    .then(logs => {
      if(logs.length){
        response.json(logs.filter(l => l.hive.id === request.params.id))
      }
      else{
        console.log('did not find by id') // actually will never come here, if not found with id then returned empty array above
        response.status(204).end()
      }
    })
    .catch(error => next(error))
})

hivelogRouter.post('/api/hivelogs', async (request, response) => {
/*
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById({_id: decodedToken.id})
*/

  const hive = await Hive.findOne({ hivename: request.body.hivename })
  //console.log('Hivelog POST from hive: ', hive)
  console.log('Hivelog POSTing: ', request.body)

  const hivelog = new HiveLog({
    title: request.body.title,
    hive_temp: request.body.hive_temp,
    hive_humidity: request.body.hive_humidity,
    amb_temp: request.body.amb_temp,
    amp_humidity: request.body.amp_humidity,
    weight: request.body.weight,
    voltage: request.body.voltage,
    note: request.body.note,
    timestamp: request.body.timestamp,
    hive: hive._id
  })


  const savedHivelog = await hivelog.save()

  response.status(201).json(savedHivelog)

})

/*
blogRouter.delete('/api/blogs/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  const blogCreator = blogToDelete.user
  const deleteRequestor = await User.findById(decodedToken.id)

  if(deleteRequestor._id.toString() !== blogCreator._id.toString()) {
    response.status(401).json({ error: 'Not allowed: Delete attempt by not creator' })
  }
  else {
    await Blog.findByIdAndRemove({ _id: request.params.id })

    await User.findOneAndUpdate(
      { _id: decodedToken.id },
      {  $pull: {
        'blogs': request.params.id
      }
      }
    )
    response.status(200).end()
  }
})

blogRouter.put('/api/blogs/:id', async (request, response) => {

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, omitUndefined: true})

  response.status(200).json(updatedBlog)
})
*/
module.exports = hivelogRouter