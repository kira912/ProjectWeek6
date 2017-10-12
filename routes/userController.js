const express = require('express')
const passport = require('passport')
const userController = express.Router()

const { ensureLoggedIn, ensureLoggedOut } = require('../middlewares/auth')

const Gift = require('../models/gift')
const User = require('../models/user')

userController.get('/bookMark', ensureLoggedIn, (req, res, next) => {
  const userId = req.params.id
  
  console.log("DEBUG user.bookmarks",req.user)
  User.findById(userId, (err, gifts) => {
    if (err) {
      return next(err)
    }
    res.render('private/bookMark', {
      gifts
    })
  })
})

/* userController.post('/giftDetail', (req, res, next) => {

  const giftId = req.body._id


  User.findByIdAndUpdate(req.user._id, {
    $addToSet: {
      bookmarks: giftId
    }
  })
}) */


module.exports = userController