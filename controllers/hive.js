//const bcrypt = require('bcrypt')
const hiveRouter = require('express').Router()
const Hive = require('../models/hive')
const Hivelog = require('../models/hivelog')

hiveRouter.get('/api/hives', async (request, response) => {
  const hives = await Hive
    .find({})
    .populate('logs', { title: 1, id: 1 })

  response.json(hives)
})

hiveRouter.post('/api/hives', async (request, response, next) => {
  const body = request.body

  //console.log("password: ", body.password, body.password.length)
/*
  if(body.password.length < 3) {
    return response.status(400).json({ error: 'password too short, min lenght of 3 required' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
*/
  const hive = new Hive({
    hivename: body.hivename,
    queen: body.queen, // or enum Red, Yellow etc.
    broodSize: body.broodSize,
    honeySize: body.honeySize  
  })
  // tämä ei toimi mongoose validator error kanssa, jää "jumiin"
  //  const savedUser = await user.save()
  //  response.json(savedUser)
  hive.save()
    .then(result => {
      //console.log("POST result from saving: ", result)
      response.status(200).json(result)
    })
    .catch(error => next(error))

})

module.exports = hiveRouter
