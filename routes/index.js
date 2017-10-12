const express = require('express');
const router = express.Router();

const Gift = require('../models/gift')


/* GET home page. */
router.get('/', (req, res, next) => {
  const catVal =  req.query.categorie
  var budgetMin = req.query.budgetMin
  var budgetMax = req.query.budgetMax

  console.log(budgetMax)

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
})


module.exports = router;
