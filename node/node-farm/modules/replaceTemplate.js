module.exports = (template , item) => {
  let output;
  // template-replacing
  output= template.replace(/{%PRODUCT_NAME%}/g, item.productName)
  output= output.replace(/{%FROM%}/g, item.from)  
  output= output.replace(/{%PRICE%}/g, item.price)
  output= output.replace(/{%IMAGE%}/g, item.image)
  output= output.replace(/{%NUTRIENTS%}/g, item.nutrients)
  output= output.replace(/{%QUANTITY%}/g, item.quantity)
  output= output.replace(/{%DESCRIPTION%}/g, item.description)
  output= output.replace(/{%ID%}/g, item.id)

  //dinamic classes
  if(!item.organic){
    output= output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  }
  return output;
}