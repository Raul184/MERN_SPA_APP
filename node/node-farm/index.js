//Modules
const fs = require('fs');
const http = require('http');
const url = require('url');
//HTML Templates
const rootData = fs.readFileSync(`${__dirname}/templates/template-overview.html` , 'utf-8');
const rootCard = fs.readFileSync(`${__dirname}/templates/template-card.html` , 'utf-8');
const rootProduct = fs.readFileSync(`${__dirname}/templates/template-product.html` , 'utf-8');
//To be brought from an API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf-8');
const dataObj = JSON.parse(data);
// console.log(dataObj);

//Templating inputs
const replaceTemplate = (template , item) => {
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
const server = http.createServer( (req , res) => {
  const { query , pathname } = url.parse( req.url , true);

  if( pathname === '/' || pathname === '/overview'){
    res.writeHead( 200 , { 'Content-type': 'text/html' });
    
    //templating
    const data = dataObj.map( item => replaceTemplate( rootCard , item)).join('');
    const output = rootData.replace( '{%PRODUCT_CARDS%}' , data);
    res.end(output);
  }
  else if( pathname === `/product`){
    //Select
    const product = dataObj[query.id];
    const output = replaceTemplate( rootProduct , product);
    res.end(output);
  }
  else if( pathname === '/api'){

  }
  else{
    res.writeHead(404 , {
      'Content-type': 'text/html'
    })
  }
  res.end('Page Not Found');
})
server.listen(4000);

