const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = require("../models/store");

const giftSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imgPath: {
    type: String
  },
  tags:{
    type: [String],
     required: true
  },
  url: String,
  store:{ type: Schema.Types.ObjectId,
          ref: "Store"
  }
})

const Gift = mongoose.model("Gift", giftSchema);
module.exports = Gift;
