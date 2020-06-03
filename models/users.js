const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    minlength: 8 ,
    select: false
  },
  passwordConfirm: {
    type: String ,
    required: [ true , 'Please confirm your password' ] ,
    validate: {
      validator: function(el){ // On create / save an User
        return el === this.password
      },
      message: 'Passwords must be the same'
    }
  },
  passwordChangeAt: Date
})


// DOC Middleware
userSchema.pre( 'save' , async function( next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash( this.password , 12 )
  // Once validation is met , no need to persist it in DB
  this.passwordConfirm = undefined;
  next()
});

// INSTANT METHODS within model
//  Check if password is correct
userSchema.methods.correctPass = async function( candidatePass , userPass ){
  return await bcrypt.compare( candidatePass , userPass )
};

// Check modifiedPass against JWT issued at 
userSchema.methods.changedPassAt = function( JwtIssuedAt ){
  if(this.passwordChangeAt){
    return JwtIssuedAt < parseInt( this.passwordChangeAt.getTime() / 1000 )
  }
  return false 
}



const UserModel = mongoose.model( 'User' , userSchema );

module.exports = UserModel