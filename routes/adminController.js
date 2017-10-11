const express = require('express')
const passport = require('passport')
const multer = require('multer')
const ensureLogin = require('connect-ensure-login')

const upload = multer({dest: './public/uploads'})

const adminController = express.Router()

const Gift = require('../models/gift')
const User = require('../models/user')
 
adminController.get('/index', checkRoles('Admin'), (req, res) => {
  Gift.find({}, (err, allGifts) => {
    if (err) {
      return next(err)
    }
    res.render('admin/index', {
      user: req.user,
      allGifts
    })
  })
})

adminController.get('/:id/edit', (req, res, next) => {
  const giftId = req.params.id

  Gift.findById(giftId, (err, gift) => {
    if (err) {
      return next(err)
    }
    res.render('admin/edit', {
      gift
    })
  })
})

adminController.get('/new', (req, res, next) => {
  res.render('admin/new')
})

adminController.post('/new', upload.single('photo'), (req, res, next) => {
  const newGift = new Gift({
    imgPath: `/uploads/${req.file.filename}`,
    name: req.body.name,
    price: req.body.price,
    tags: req.body.tags,
    description: req.body.description,
  })

  newGift.save((err) => {
    if (err) {
      res.render('admin/new')
    } else {
      res.redirect('index')
    }
  })
})

adminController.post('/:id/edit', upload.single('photo'), (req, res, next) => {
  const giftId = req.params.id

  const update = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    //imgPath: `/uploads/${req.file.filename}`
  }

  Gift.findByIdAndUpdate(giftId, update, (err, allGifts) => {
    if(err) {
      return next(err)
    }
    res.redirect(`/admin/index`)
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

/* var checkAdmin = checkRoles('Admin')
const checkClient = checkRoles('Client')
const checkGuest = checkRoles('Guest')  */
module.exports = adminController