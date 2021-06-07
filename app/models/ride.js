const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
  date: {
    type: String
  },
  duration: {
    type: Number
  },
  miles: {
    type: Number
  },
  output: {
    type: Number
  },
  calories: {
    type: Number
  },
  instructor: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Ride', rideSchema)
