const express = require('express');
const router = express.Router();

const Gift = require('../models/gift')


/* GET home page. */
router.get('/', (req, res, next) => {
  Gift.find({}, "name price imgPath")
    .exec((err, allGifts) => {
      res.render('index', { allGifts });
    });
});

router.get('/:id', (req, res, next) => {
  const giftId = req.params.giftId

  Gift.findById(giftId, (err, gift) => {
    if(err) {
      return next(err)
    }
    res.render('/giftDetail', {
      gift
    })
  })
})

module.exports = router;
