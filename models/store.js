const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  places: [{
    location:{ type: { type: String }, coordinate: [Number]},
    address: { type: String }
  }],
  url: String
})

storeSchema.index({location: '2dsphere'})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store