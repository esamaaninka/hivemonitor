const mongoose = require('mongoose')


const hivelogSchema = mongoose.Schema({
  title: {
    type: String, // tai string enun default "Log: "
    required: true
  },
  /*hive_id: {  // vai riittäiskö tuo hive ref ? 
    type: Number,
    required: true,
    unique: true
  },*/
  hive_temp: Number,
  hive_humidity: Number,
  amb_temp: Number,
  amp_humidity: Number,
  weight: Number,
  voltage: Number,
  note: String,
  timestamp: String,

  hive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hive'
  }
}, { timestamps: true })


hivelogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('HiveLog', hivelogSchema)