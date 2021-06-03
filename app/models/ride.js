const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
  date: {
    type: String
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Ride', rideSchema)
