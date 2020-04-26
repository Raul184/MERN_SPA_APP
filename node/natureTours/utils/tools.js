


const filterObj = ( obj , ...allowedFields ) => {
  const nueObj = {}
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)){
      nueObj[el] = obj[el]
    }
  })
  return nueObj;
}
  
module.exports = filterObj;