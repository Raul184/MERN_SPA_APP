const TourModel = require('../models/tour');


// Middleware
exports.getTop = async (req , res , next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price'
  next();
}

exports.getAllTours = async (req , res) => {
  try {
    // // 1. Filter 
    const queryObj = { ...req.query }
    const excluded = [ 'page' , 'sort' , 'limit' , 'fields']
    excluded.forEach(el => delete queryObj[el])
    
    // 2. Advanced Filtering
    const queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}`)
    
    let query = TourModel.find( JSON.parse(queryStr) )
    
    // 3. Sorting
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } 
    else {
      query = query.sort('-createdAt');
    }

    // 4. Fields limit
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }
    else{
      query= query.select(`-__v`);
    }

    // 5. Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = ( page - 1 ) * limit;
    query = query.skip(skip).limit(limit);

    if(req.query.page){
      const numTours = await TourModel.countDocuments();
      if(skip > numTours){
        throw new Error(`This page doesn't exist`)
      }
    }
    
    const tours = await query;
    
    if(tours.length > 0){
      return res.status(200).json({
        results: tours.length ,
        data: tours
      })
    }
    else{
      return res.status(404).json({
        msg: `Sorry, we don't have available tours right now`
      })
    }
  } 
  catch (error) {
    return res.status(500).json({ msg: error.array() })
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
    return res.status(500).json({ msg: error.array() })
  }
}

exports.addTour = async (req , res) => {
  try {
    const res = await TourModel.create( req.body )
    return res.status(200).json({ 
      msg: "Tour added" 
      // data: res
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
    return res.status(404).json({ msg: error.message })
  }
}

exports.deleteTour = async ( req , res ) => {
  try {
    await TourModel.findByIdAndDelete(req.params.id)
    return res.status(204).json({ msg: 'Tour successfully removed' })
  } 
  catch (error) {
    return res.status(500).json({ msg: error })
  }
}

