const TourModel = require('../models/tour');
const ApiFeatures = require('./Api/ApiFeatures')

// Middleware
exports.getTop = async (req , res , next) => {
  // req.query.limit = '5';
  // req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next();
}

exports.getAllTours = async (req , res) => {
  try {
    const features = await new ApiFeatures( TourModel.find() , req.query  )
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
    const tour = await TourModel.findById(req.params.id)
    if(tour){
      return res.status(200).json({
        data: tour
      })
    }else{
      return res.status(404).json({ msg: `Sorry, we couldn't find any associated tour`})
    }
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

exports.addTour = async (req , res) => {
  try {
    const res = await TourModel.create( req.body )
    return res.status(200).json({ 
      msg: "Tour added" ,
      data: res
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
      }
    )
    return res.status(200).json({ data: updt })
  } 
  catch (error) {
    return res.status(500).json({ msg: error })
  }
}

exports.deleteTour = async ( req , res ) => {
  try {
    await TourModel.findByIdAndDelete(req.params.id)
    return res.status(204).json({ msg: 'Tour successfully removed' })
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

//                            =============  STATS  ===============

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