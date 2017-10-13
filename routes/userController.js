const express = require('express')
const passport = require('passport')
const userController = express.Router()

const { ensureLoggedIn, ensureLoggedOut } = require('../middlewares/auth')

const Gift = require('../models/gift')
const User = require('../models/user')

userController.get('/bookMark', ensureLoggedIn, (req, res, next) => {  
  console.log("DEBUG user.bookmarks",req.user)
  User.findById(req.user._id).then(user => {
    return user.populate("bookmarks").execPopulate()
  }).then(user => {
    console.log(user)
    res.render('private/bookMark', {
      gifts: user.bookmarks
    })
  }).catch(err => next(err))
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