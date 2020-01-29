const TourModel = require('../models/tour');



exports.getAllTours = async (req , res) => {
  try {
    const tours = await TourModel.find()
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
      msg: "Tour added" ,
      data: res
    })  
  } 
  catch (error) {
    return res.status(500).json({ msg: error.array() })
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
    return res.status(500).json({ msg: error })
  }
}

