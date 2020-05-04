const AppError = require('../utils/ErrorHandler');
const ApiFeatures = require('./Api/ApiFeatures');

// FACTORY FUNCTIONS ON CRUD Ops.

exports.createOne = Model => async (req , res) => {
  try {
    const doc = await Model.create( req.body )

    return res.status(200).json({ 
      msg: "Successfully added" ,
      data: doc
    })  
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

exports.getAllOnes = Model => async ( req , res ) => {
  try {
    const features = new ApiFeatures( Model.find() , req.query  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const doc = await features.query;
 
    return res.status(200).json({
      status: 'success' ,
      results: doc.length ,
      data: {
        doc
      }
    })  
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}



exports.getOne = Model => async (req , res) => {
  try {
    const doc = await Model.findById(req.params.id);

    if(doc){
      return res.status(200).json({
        data: doc
      })
    }
    else{
      return next( new AppError(`Sorry, we couldn't find any document with Id provided` , 404))
    }
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

exports.updateOne = Model => async (req , res) => {
  try {
    const doc = await Model.findByIdAndUpdate(
      req.params.id , 
      req.body, 
      { 
        new: true ,
        runValidators: true 
    })
    if(!doc){
      return next( new AppError(`Sorry, we couldn't find any associated tour` , 404))
    }

    return res.status(200).json({
      status: 'success' , 
      data: doc
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: error })
  }
}



// Factory f() to delete docs in App
exports.deleteOne = Model => async ( req , res , next ) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if(!doc){
      return next( new AppError(`Sorry, we couldn't find any associated tour` , 404))
    }

    return res.status(200).json({ 
      msg: 'Data successfully removed' 
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}



