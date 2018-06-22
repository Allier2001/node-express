const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongodb');
const Schema = mongoose.Schema


const UserSchema = new Schema({
  username: String,
  email: String
}, {
  timestamps: true
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel