const fs = require('fs');

const tours= JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


// Middleware for Id
exports.checkID = ( req, res, next, val ) => {
  if(req.params.id * 1 > tours.length ){
    return res.status(404).json({
      msg: 'Invalid Id'
    })
  }
  next();
} 

// Middleware for body-checking
exports.checkBody = ( req , res , next , val ) => {
  if(!req.body.name || !req.body.price ){
    return res.status(400).json({
      msg: "Please complete all fields"
    })
  }
  next();
}
// @Route           / 
// @Description     Get all tours
// @Access          Public
exports.getAllTours = (req , res) => {
  return res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours
    }
  })
} 
// @Route           /:id 
// @Description     Get 1 tour
// @Access          Public
exports.getATour = (req , res) => {
  const tour = tours.filter(el => el.id === req.params.id)
  return res.status(200).json({
    status: 'Success',
    data:{
      tour
    }
  });
}
// @Route           /:tour 
// @Description     Add a new tour
// @Access          Private
exports.addTour = (req , res) => {
  const nueId = tours[tours.length - 1].id + 1;
  const nueTour = Object.assign({ id: nueId} , req.body);
  tours.push(nueTour);
 
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json` , 
    JSON.parse(tours) , 
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: nueTour
        }
      })
    } 
  )
}
// @Route           /:tour 
// @Description     Update a tour
// @Access          Private
exports.updateTour = (req , res) => {
  const updating = tours.map(el => {
    el.id === req.params.id ? req.body : el
  })
  
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json` , 
    JSON.parse(updating) , 
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: updating
        }
      })
    } 
  )
}
// @Route           /:id
// @Description     DELETE a  tour
// @Access          Private

exports.deleteTour = ( req , res ) => {
  
  tours = tours.filter(el => el.id !== JSON.parse(req.params.id) )
  fs.writeFile( 
    `${__dirname}/../dev-data/data/tours-simple.json` , 
    JSON.parse(tours) ,
    err => {
      res.status(200).json({ msg: "Tour deleted" })
    }
  )
}

