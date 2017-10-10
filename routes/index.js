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

/* Get gift page */

router.get('/gifts/:id', (req, res, next) => {
  const giftId = req.params.id

  Gift.findById(giftId)
    .populate("store")
    .exec((err, gift) => {
      if(err) {
        return next(err)
      }
      res.render('giftDetail', {
        gift : gift
      })
    })

  // Gift.findById(giftId, (err, gift) => {
  //   if(err) {
  //     return next(err)
  //   }
  //   res.render('giftDetail', {
  //     gift : gift
  //   })
  // })
})


module.exports = router;
