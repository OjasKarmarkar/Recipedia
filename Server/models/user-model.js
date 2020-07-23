const mongoose = require('mongoose')
const Schema = mongoose.Schema;

userSchema = new Schema({
    username : {type:String , required:true} ,
    googleID : {type:String , required:true},
    profilePic : {type:String , required:true}
})

const User = mongoose.model('user' , userSchema)

module.exports = User;