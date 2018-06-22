const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongodb');
const Schema = mongoose.Schema

// Collection schema
const UserSchema = new Schema({
  username: String,
  email: String
}, {
  timestamps: true
})

// Model
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel