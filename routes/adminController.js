const express = require('express')
const passport = require('passport')
const ensureLogin = require('connect-ensure-login')

const adminController = express.Router()

const User = require('../models/user')
/* 
adminController.get('/admin/index', checkAdmin, (req, res) => {
  res.render('admin/index', {
    user: req.user
  })
})



function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next()
    } else {
      res.redirect('/login')
    }
  }
}

const checkAdmin = checkRoles('Admin')
const checkClient = checkRoles('Client')
const checkGuest = checkRoles('Guest') */
module.exports = adminController