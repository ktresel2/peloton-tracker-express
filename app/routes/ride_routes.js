const express = require('express')

const passport = require('passport')

const { requireOwnership } = require('./../../lib/custom_errors')

const Ride = require('./../models/ride')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/rides', requireToken, (req, res, next) => {
  Ride.find({ owner: req.user._id })
    .then(rides => {
      res.json({ rides })
    })
    .catch(next)
})

router.post('/rides', requireToken, (req, res, next) => {
  req.body.ride.owner = req.user._id
  const rideData = req.body

  Ride.create(rideData)
    .then(ride => {
      res.status(201).json({ride})
    })
    .catch(next)
})

router.delete('/rides/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Ride.findById(id)
    .then(ride => {
      requireOwnership(req, ride)
    })
    .then(ride => {
      ride.deleteOne()
    })
    .then(() => {
      res.status(204)
    })
    .catch(next)
})

router.patch('/rides/:id', requireToken, (req, res, next) => {
  delete req.body.event.owner
  const id = req.params.id

  Ride.findbyId(id)
    .then(ride => {
      requireOwnership(req, ride)
      return ride.updateOne(req.body.ride)
    })
    .then(() => {
      res.status(204)
    })
    .catch(next)
})

module.exports = router
