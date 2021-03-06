const express = require('express')
const passport = require('passport')
const authController = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('../middlewares/auth')


authController.get('/login', ensureLoggedOut, (req, res, next) => {
  res.render('auth/login', {
    message: req.flash('error')
  })
})

authController.get('/signup', ensureLoggedOut, (req, res, next) => {
  res.render('auth/signup', {
    message: req.flash('error')
  })
})


authController.get('/logout', ensureLoggedIn, (req, res, next) => {
  req.logout()
  res.redirect('/')
})
authController.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

authController.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true,
}))




authController.get('/private/home', ensureLoggedIn, (req, res, next) => {
  res.render('private/home')
})

module.exports = authController
