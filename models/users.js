const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , 'Please provide your name' ]
  },
  email: {
    type: String ,
    unique: true ,
    lowercase: true , 
    validate: [validator.isEmail , 'Please provide a valid email']
  },
  photo: String ,
  password: {
    type: String ,
    required: [ true , 'Please provide a valid password' ] ,
    minlength: 8
  },
  passwordConfirm: {
    type: String ,
    required: [ true , 'Please confirm your password' ]
  }
})





const UserModel = mongoose.model( 'User' , userSchema );

module.exports = UserModel