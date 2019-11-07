
//Modules
const fs = require('fs');
const server = require('http');
//HTML Templates
const rootData = fs.readFileSync(`${__dirname}/templates/template-overview.html` , 'utf-8');
const rootCard = fs.readFileSync(`${__dirname}/templates/template-card.html` , 'utf-8');
const rootProduct = fs.readFileSync(`${__dirname}/templates/template-product.html` , 'utf-8');
//To be brought from an API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf-8');
const dataObj = JSON.parse(data);


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
server.createServer( (req , res) => {
  const pathName = req.url;

  if( pathName === '/' || pathName === '/overview'){
    res.writeHead( 200 , { 'Content-type': 'text/html' });
    //templating
    const data = dataObj.map( item => replaceTemplate( rootCard , item)).join('');
    
    const output = rootData.replace( '{%PRODUCT_CARDS%}' , data);
  
    res.end(output);
  }
  else if( pathName === '/product'){
    res.end(rootProduct);
  }
  else if( pathName === '/api'){

  }
  else{
    res.writeHead(404 , {
      'Content-type': 'text/html'
    })
  }
  res.end('yeah , I got this');
}).listen(4000);

