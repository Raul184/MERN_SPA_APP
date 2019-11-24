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
    data: {
      tours
    }
  })
})

router.post('/' , (req , res) => {
  console.log(req.body);
  res.send('done');
})

module.exports = router;