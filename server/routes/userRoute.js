const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req,res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      res.status(201).json({
        success: true,
        message: `Account ${user.name} registered`
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err
      })
    })
})

router.post('/login', (req,res) => {
  User.find({email: req.body.email}, function(err, user) {
    if (!err) {
      if (user.length !== 0) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
          jwt.sign({ id: user[0]._id, name: user[0].name, email: user[0].email }, process.env.JWT_KEY, function(err, token) {
            if(!err) {
              res.status(201).json({
                token: token
              })
            } else {
              res.status(500).json({
                message: err
              })
            }
          });
        } else {
          res.status(500).json({
            message: 'wrong password!'
          })
        }
      } else {
        res.status(500).json({
          message: 'you have not registered!'
        })
      }
    } else {
      res.status(500).json({
        message: err
      })
    }
  })
})

module.exports = router;