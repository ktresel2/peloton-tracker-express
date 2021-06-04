const express = require('express')

const passport = require('passport')

const errors = require('./../../lib_custom_errors')

const Ride = require('./../models/ride')
const User = require('./../models/user')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/rides', requireToken, (req, res, next) => {
  req.body.ride.owner = req.user._id
  const rideData = req.body

  Ride.create(rideData)
    .then(ride => {
      res.send() 
    })
})
