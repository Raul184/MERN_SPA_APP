const TourModel = require('../models/tour');
const ApiFeatures = require('./Api/ApiFeatures');
const AppError = require('../utils/ErrorHandler');
const factory = require('./factory');



// Middleware
exports.getTop = async (req , res , next) => {
  // req.query.limit = '5';
  // req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next();
}

exports.getAllTours = async (req , res) => {
  try {
    const features = new ApiFeatures( TourModel.find() , req.query  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const tours = await features.query;
    // console.log(tours);
    
    return res.status(200).json({
        results: tours.length ,
        data: {
          tours
        }
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
} 

exports.getATour = async (req , res) => {
  try {
    const tour = await TourModel.findById(req.params.id).populate('reviews');
    
    // Refactored on 1/May/20 (onTesting)
    //.populate({
    //   path: 'guides' ,
    //   select: '-__v'
    // })   ==> Refactored => Query Middleware to avoid repetition => ln 13

    if(tour){
      return res.status(200).json({
        data: tour
      })
    }else{
      return next( new AppError(`Sorry, we couldn't find any associated tour` , 404))
    }
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

exports.addTour = async (req , res) => {
  try {
    const tourAdd = await TourModel.create( req.body )
    return res.status(200).json({ 
      msg: "Tour added" ,
      data: tourAdd
    })  
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

exports.updateTour = async (req , res) => {
  try {
    const updt = await TourModel.findByIdAndUpdate(
      req.params.id , 
      req.body, 
      { 
        new: true ,
        runValidators: true 
    })
    if(!updt){
      return next( new AppError(`Sorry, we couldn't find any associated tour` , 404))
    }

    return res.status(200).json({ data: updt })
  } 
  catch (error) {
    return res.status(500).json({ msg: error })
  }
}

exports.deleteTour = factory.deleteOne(TourModel);


//=============  STATS  ===============

// GET Customized stats 
exports.getTourStats = async ( req, res ) => {
  try {
    // Pipeline Aggregation
    const stats = await TourModel.aggregate([
      { //filter
        $match: { ratingsAverage: { $gte: 4.5 }}
      },
      {  //group This Stats
        $group: {
          _id: '$difficulty' ,
          numTours: { $sum: 1 } ,
          numRatings: { $sum: '$ratingsQuantity' } ,
          avgRating: { $avg: '$ratingsAverage' } ,
          avgPrice: { $avg: '$price' } ,
          minPrice: { $min: '$price' } ,
          maxPrice: { $max: '$price' } 
        }
      },
      { //Sorting Ascending
        $sort: {
          avgPrice: 1
        }
      }
    ])  
    return res.status(200).json({
      data: {
        stats
      }
    })
  } 
  catch (error) {
    return res.status(404).json({ msg: error.message })
  }
}

exports.getMonthlyPlan = async ( req, res ) => {
  try {
    const year = req.params.year * 1;

    // Pipeline Aggregation
    const plan = await TourModel.aggregate([
      { // deconstruct arrays and output data 1 by 1
        $unwind: '$startDates'
      },
      { // Select 
        $match: { 
          startDates: {
            $gte: new Date(`${year}-01-01`) ,
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      { // Agrupa
        $group: {
          _id: { $month: '$startDates'} ,
          numStarts: { $sum: 1 } ,
          tours: { $push: '$name' }
        }
      },
      { // + month field => Start Date
        $addFields: { month: '$_id'}
      } ,
      { // hide id
        $project: { _id: 0 }
      },
      { // descending
        $sort: { numStarts : -1 }
      }
    ])  
    return res.status(200).json({
      data: {
        plan
      }
    })
  } 
  catch (error) {
    return res.status(404).json({ msg: error.message })
  }
}