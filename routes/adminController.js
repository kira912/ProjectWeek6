const express = require('express')
const passport = require('passport')
const multer = require('multer')
const ensureLogin = require('connect-ensure-login')

const upload = multer({dest: './public/uploads'})

const adminController = express.Router()

const Gift = require('../models/gift')
const User = require('../models/user')
const Store = require('../models/store')
 
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

adminController.get('/:id/show', checkRoles('Admin'), (req, res, next) => {
  const giftId = req.params.id

  Gift.findById(giftId)
    .populate("store")
    .exec((err, gift) => {
      if (err) {
        return next(err)
      }
      res.render('admin/show', {
        gift
      })
    })
})

adminController.get('/:id/edit', checkRoles('Admin'), (req, res, next) => {
  const giftId = req.params.id
  console.log("Debug", req)
  Gift.findById(giftId, (err, gift) => {
    Store.find({}, (err, stores) => {
      if (err) {
        return next(err)
      }
      res.render('admin/edit', {
        stores,
        gift
      })
    })
  })
})

adminController.get('/:id/delete', checkRoles('Admin'), (req, res, next) => {
  const giftId = req.params.id

  Gift.findById(giftId, (err, gift) => {
    if (err) {
      return next(err)
    }
    res.render('admin/delete', {
      gift
    })
  })
})

adminController.get('/new', checkRoles('Admin'), (req, res, next) => {
  res.render('admin/new')
})

adminController.post('/new', upload.single('photo'), (req, res, next) => {
  const infoGift = {
    imgPath: `/uploads/${req.file.filename}`,
    name: req.body.name,
    price: req.body.price,
    tags: req.body.tags,
    description: req.body.description,
    //store: req.body.store
  }

  const newGift = new Gift(infoGift)

  newGift.save((err) => {
    if (err) {
      console.log(err)
      res.render('admin/new')
    }
      res.redirect('/admin/index')
  })
})

adminController.post('/:id/edit', upload.single('photo'), (req, res, next) => {
  const giftId = req.params.id;

  console.log("DEBUG req.body", req.body);
  /*
   name: 'Nutella 5kg pour les gros',
  price: '49.3',
  description: '    ',
  tags: [ 'cuisine', '' ],
  store: '' }

  */

  let update = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    tags: req.body.tags,
    store: req.body.store,
  }
  if (req.file && req.file.filename) {
    update.imgPath = `/uploads/${req.file.filename}`;
  }

  Gift.findByIdAndUpdate(giftId, update, (err, allGifts) => {
    if(err) {
      return next(err)
    }
    res.redirect(`/admin/index`)
  })
})

adminController.post('/:id/delete', (req, res, next) => {
  const giftId = req.params.id

  Gift.findByIdAndRemove(giftId, (err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/admin/index')
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

module.exports = adminController