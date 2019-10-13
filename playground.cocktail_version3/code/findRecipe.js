var http = require('http') //http라이브러리를 불러옴
var console = require('console')
var config = require('config')
//레시피 
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

module.exports.function = function findRecipe(id, page) {
  console.log(id);
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
    type: undefined
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
  cocktailInfo.image = searchCock.parsed.img
  if (cocktailInfo.isbase == true) {
    cocktailInfo.recoName = getRecoImage(cocktailInfo)
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
function getRecoImage(cocktailInfo) {
  let recoSplit = cocktailInfo.recoName.split(',')
  let recoName = []
  for (let i = 0; i < recoSplit.length; i++) {
    let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "")
    let tempRes = http.getUrl(newUrl, options)
    if (tempRes.status == 200) {
      recoName.push({ url: tempRes.parsed.img })
    }
  }
  return recoName
}