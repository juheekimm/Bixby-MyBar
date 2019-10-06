module.exports.function = function findRecipe (name) {
  const fakeData = require("./data/recipeData.js")
  var console = require('console')
  console.log(fakeData);
  let recipeInfo = null;
  for(let i = 0; i < fakeData.length; i++){
    if(fakeData[i].name == String(name)){
       recipeInfo = fakeData[i];
       break;
    }
  }
  if(recipeInfo == null) recipeInfo = fakeData

  return recipeInfo;
}

