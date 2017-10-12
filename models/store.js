const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  query: String,
    url: String
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store
