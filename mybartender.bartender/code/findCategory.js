var http = require('http');
var console = require('console');
var config = require('config');

module.exports.function = function findCategory(category, page) {
  let utils = require('lib/utils.js');
  
  let options = {
    format: 'json',
    returnHeaders: true
  };

  let searchResult = {};
  let searchList = [];
  
  let cocktailInfo = {
    id: undefined,
    name: undefined,
    category : undefined,
    abv: undefined,
    imageName: undefined,
    description: undefined,
    isbase: undefined,
    recoName: undefined,
    material: undefined,
    subMaterial: undefined,
    type: undefined,
    image: undefined,
    majorCategory: undefined,
    subCategory : undefined
  };

  searchResult = http.getUrl(config.get('category.url') + category, options);

  if (searchResult.status == 200) {
    for (let index = 0; index < searchResult.parsed.length; index++) {
      cocktailInfo = searchResult.parsed[index].data;
      cocktailInfo.subCategory = searchResult.parsed[index].data.category;
      cocktailInfo.id = searchResult.parsed[index].id;
      
      if (cocktailInfo.subCategory.length > 0) {               
        if (cocktailInfo.subCategory.split(",").length >= 1) { 
          cocktailInfo.category = (cocktailInfo.subCategory.split(","))[0];
        }
      }

      cocktailInfo.majorCategory = " ";
      searchList.push(cocktailInfo);
    }
  }

  return searchList
}
