const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
  role: {
    type: String , 
    enum: ['user' , 'guide' , 'lead-guide' , 'admin'] ,
    default: 'user'  
  },  
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
  passwordChangedAt: Date ,
  passwordResetToken: String ,
  passwordResetExpires: Date
});

// BUILT-IN Middlewares for Mongoose
// Pre ==> to Manipulate Data Always Before it gets saved into DB
users.pre('save' , async function(next){
  if(!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  //after validation , no need to persist this field into DB ==> erase
  this.passwordConfirm = undefined;
  next();
})

// to update changedPasswordAt when User forgot Password
users.pre('save' , async function(next){
  if(!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000;
  next();
  
})
// Instant Methods -------------

// Compare & verify passwords for token login
users.methods.correctPassword = async function (
   candidatePass , 
   userPass 
) {
  return await bcrypt.compare( candidatePass , userPass )
}

// Reset password for user
users.methods.generateToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex')
  // temp. token 
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  // time discount 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const UserModel = mongoose.model('User' , users);
module.exports = UserModel;