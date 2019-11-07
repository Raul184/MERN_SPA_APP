//HELPERS
export class Helper {
  constructor(){
  }
  replaceTemplate(template , item){
    let output;
    // template-replacing
    output= template.replace(/{%PRODUCTNAME%}/g, item.name)
    output= output.replace(/{%FROM%}/g, item.from)  
    output= output.replace(/{%PRICE%}/g, item.price)
    output= output.replace(/{%IMAGE%}/g, item.image)
    output= output.replace(/{%NUTRIENTS%}/g, item.image)
    output= output.replace(/{%QUANTITY%}/g, item.image)
    output= output.replace(/{%DESCRIPTION%}/g, item.image)
    output= output.replace(/{%ID%}/g, item.image)
  
    //dinamic classes
    if(!output.organic){
      output= output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    }
    return output;
  }
}
