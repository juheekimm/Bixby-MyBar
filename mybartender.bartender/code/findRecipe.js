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
    majorCategory: undefined
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
  cocktailInfo.id = searchCock.parsed.id
  // cocktailInfo.image = searchCock.parsed.img
  if (cocktailInfo.category.length > 0) {               //카테고리가 있는데
    if (cocktailInfo.category.indexOf(", ") == -1) {   //split할 수 없는 상황(카테고리가 하나)에 대한 예외 처리
      cocktailInfo.majorCategory = cocktailInfo.category;
    } else if (cocktailInfo.category.split(", ").length >= 1) { //split할 수 있으면 첫번째를 대표카테고리로
      cocktailInfo.majorCategory = (cocktailInfo.category.split(", "))[0];
    }
  } else {
    cocktailInfo.majorCategory = "";
  }

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
