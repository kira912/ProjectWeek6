const express = require('express');
const multer = require('multer')
const router = express.Router();

const upload = multer({dest: './public/images'})
const Gift = require('../models/gift')


/* GET home page. */
router.get('/', upload.single('photo'), (req, res, next) => {
  Gift.find({}, "name price imgPath")
  .exec((err, allGift) => {
  res.render('index', { allGift });
  })
});

module.exports = router;
