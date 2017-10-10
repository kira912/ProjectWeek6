const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  places: [{
    location:{ type: { type: String }, coordinates: [Number]},
    address: { type: String }
  }],
  url: String
})

storeSchema.index({"places.location": '2dsphere'})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store