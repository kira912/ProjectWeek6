const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Client'],
        default: 'Client'
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: "Gift"
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User