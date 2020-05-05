const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
// Data Models
const TourModel = require('../../models/tour');
const UsersModel = require('../../models/user');
const ReviewsModel = require('../../models/review');

// Switching it on
// dotenv.config({ path: '../../config.env'});
dotenv.config({ path: './config.env'});
// DB
mongoose.connect( process.env.MONGO_URI , {
  useNewUrlParser: true ,
  useUnifiedTopology: true ,
  useCreateIndex: true ,
  useFindAndModify: false
}).then(
  () => console.log('DB plugged')
)

// 1. Reading fl ==> [ Objs ]
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json` , 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json` , 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json` , 'utf-8'));


// 2. Import Data into DB
const importData = async () => {
  try {
    await TourModel.create(tours);    // Skip validations for this model
    await UsersModel.create(users , { validateBeforeSave: false });
    await ReviewsModel.create(reviews);
    console.log('Data imported confirmation');
    process.exit(1);
  } 
  catch (error) {
    console.log(error);  
  }
}

// Optional ==> Delete Previous Data from collection
const deleteData = async () => {
  try {
    await TourModel.deleteMany();
    await UsersModel.deleteMany();
    await ReviewsModel.deleteMany();
    console.log('Previous data erased');
    process.exit(1);
  } 
  catch (error) {
    console.log(error);  
  }
}
// To work with Scripts => Double Checking 
console.log(process.argv);

if(process.argv[2] === '--import'){
  importData();
}
else if(process.argv[2] === '--delete'){
  deleteData();
}