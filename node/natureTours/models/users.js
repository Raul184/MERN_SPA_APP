const mongoose = require('mongoose');

const users = new mongoose.Schema({
  name: {
    type: String ,
    trim: true ,
    unique: true
  } ,
  email: {
    type: String ,
    trim: true ,
    unique: true
  },
  role: {
    type: String,
    trim: true
  },
  active: Boolean , 
  photo: [ String ],
  password: {
    type: String ,
    unique: true
  }
});

const UsersModel = mongoose.model('users' , users);

module.exports = UsersModel;