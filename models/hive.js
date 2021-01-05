
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const hiveSchema = new mongoose.Schema({
  hivename: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  queen: String, // or enum Red, Yellow etc.
  broodSize: Number,
  honeySize: Number
},{ timestamps: true })

hiveSchema.plugin(uniqueValidator)


hiveSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Hive = mongoose.model('Hive', hiveSchema)


module.exports = Hive