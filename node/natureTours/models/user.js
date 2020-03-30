const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const users = new mongoose.Schema({
  name: {
    type: String ,
    trim: true ,
    required: [ true , 'Please input your name' ]
  } ,
  email: {
    type: String ,
    trim: true ,
    unique: true,
    required: [ true , 'Please input your email address'] ,
    lowercase: true ,
    validate: [ validator.isEmail , 'Please input a valid email']
  },
  photo: String  ,
  password: {
    type: String ,
    required: [ true , 'A password is required'] ,
    minlength: 8 ,
    //hide field
    select: false
  },
  passwordConfirm: {
    type: String ,
    required: [ true , 'Please confirm your password'] ,
    validate: { 
      // Only works on Create or SAVE
      validator: function(el){ 
        return el === this.password
      } ,
      message: `Password don't match`
    }
  },
  passwordChangedAt: Date
});
// Pre ==> to Manipulate Data Always Before it gets saved into DB
users.pre('save' , async function(next){
  if(!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  //after validation , no need to persist this field into DB ==> erase
  this.passwordConfirm = undefined;
  next();
})


// Instant Methods
users.methods.correctPassword = async function (
   candidatePass , 
   userPass 
) {
  return await bcrypt.compare( candidatePass , userPass )
}


const UserModel = mongoose.model('User' , users);
module.exports = UserModel;