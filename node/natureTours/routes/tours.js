const fs = require('fs');
//Router
const express = require('express');
const router= express.Router();

//Get all Tours             GET 
//public
const tours= JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
// console.log(tours);

router.get('/' , (req , res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours
    }
  })
})

router.post('/' , (req , res) => {
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
});

module.exports = router;