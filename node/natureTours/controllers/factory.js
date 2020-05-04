const AppError = require('../utils/ErrorHandler');


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