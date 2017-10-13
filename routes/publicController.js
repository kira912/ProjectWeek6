const express = require('express');
const router = express.Router();

const Gift = require('../models/gift')
const User = require('../models/user')


/* GET home page. */
router.get('/', (req, res, next) => {
  const catVal =  req.query.categorie

  if (req.query.test) {
    var interval = req.query.test.split('-')
    var budgetMin = interval[0]
    var budgetMax = interval[1]
  }
  console.log("debug", budgetMin)

  var filter = {};
  if (catVal) {
   filter.tags = catVal;
  }
  
  // filter on price
  filter.price = {};
  if(budgetMin) {
    filter.price.$gt = budgetMin;
  } 
  if (budgetMax) {
    filter.price.$lt = budgetMax;
  }
  if (Object.keys(filter.price).length === 0) {
    delete filter.price;
  }

  Gift.find(filter,(err, allGifts) => {
    if (err) {
      return next(err)
    }
    res.render('index',{
      allGifts,
      budgetMinPreviouslySelected: budgetMin,
      budgetMaxPreviouslySelected: budgetMax,
    })
  })
 })
 

/* Get gift page */

router.get('/gifts/:id', (req, res, next) => {
  const giftId = req.params.id

  console.log("DEBUG req.user", req.user)
  
  Gift.findById(giftId)
    .populate("store")
    .exec((err, gift) => {
      if(err) {
        return next(err)
      }
      res.render('giftDetail', {
        gift,
        isBookmarked: req.user.bookmarks.indexOf(giftId) !== -1
      })
    })
})

router.post('/private/bookMark/:giftId', (req, res, next) => {
  
    const giftId = req.params.giftId;

    console.log("DEBUG req.user._id", req.user._id)
  
  
    User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        bookmarks: giftId
      }
    },
    (err, user) => {
      res.redirect('/gifts/'+giftId);
    })
  })

module.exports = router;
