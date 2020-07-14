const mongoose = require('mongoose')
const Schema = mongoose.Schema;

userSchema = new Schema({
    username : String ,
    googleID : String ,
    profilePic : String
})

const User = mongoose.model('user' , userSchema)

module.exports = User;