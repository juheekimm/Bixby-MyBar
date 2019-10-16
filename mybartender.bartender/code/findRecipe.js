var http = require('http') //http라이브러리를 불러옴
var console = require('console')
var config = require('config')
module.exports.function = function findRecipe(id, page) {
  let utils = require('lib/utils.js')
  let options = {
    format: 'json',
    returnHeaders: true
  };
  let searchCock = {}
  let searchRecipe = {}
  let cocktailInfo = {
    id: undefined,
    name: undefined,
    category: undefined,
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
  }
  var recipeInfo = {
    cocktail: undefined,
    cockware: undefined,
    method: undefined,
    capacity: undefined,
    steps: undefined,
    steplist: undefined
  }

  searchCock = http.getUrl(config.get('single.url') + id, options)

  cocktailInfo = searchCock.parsed.data
  cocktailInfo.subCategory = searchCock.parsed.data.category
  cocktailInfo.category = searchCock.parsed.data.category;
  cocktailInfo.id = searchCock.parsed.id


  cocktailInfo.majorCategory = " ";

  console.log(cocktailInfo);
  searchRecipe = http.getUrl(config.get('recipe.url') + id, options)
  recipeInfo = searchRecipe.parsed.data
  recipeInfo.id = searchRecipe.parsed.id
  recipeInfo.steplist = (searchRecipe.parsed.data.steps).split("_")
  recipeInfo.cocktail = cocktailInfo

  console.log(searchRecipe)
  console.log(searchCock)

  console.log(recipeInfo)

  return recipeInfo
}
