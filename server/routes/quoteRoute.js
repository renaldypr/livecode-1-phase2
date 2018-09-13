const router = require('express').Router();
const Quote = require('../models/quote');
const { auth } = require('../middlewares/auth');

router.post('/', auth, (req,res) => {
  Quote.create({
    user: req.decoded.id,
    status: req.body.status,
    likes: []
  })
    .then(quote => {
      res.status(201).json(quote)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req,res) => {
  Quote.find(function(err, quotes) {
    if (!err) {
      res.status(200).json(quotes)
    } else {
      res.status(500).json(err)
    }
  })
})

router.delete('/:id', auth, (req,res) => {
  Quote.deleteOne({ _id: req.params.id }, function (err) {
    if (!err) {
      res.status(201).json({
        success: true,
        message: `Quote with id ${req.params.id} deleted`
      })
    } else {
      res.status(500).json(err)
    }
  })
})

module.exports = router