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
    reuquired: true
  },
  imgPath: {
    type: String,
    required: true
  },
  tags: [String],

  store: { type: Schema.Types.ObjectId, ref: "Store" }
});

const Gift = mongoose.model("Gift", giftSchema);
module.exports = Gift;
