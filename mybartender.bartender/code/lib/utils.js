var http = require('http')
var console = require('console')
var config = require('config')
var utils = {};


utils.http = http
utils.console = console
utils.config = config


utils.replaceAll = function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

utils.getRecoImage = function getRecoImage(names) {
  let recoSplit = names.split(',');
  let recoName = [];

  for (let i = 0; i < recoSplit.length; i++) {
    let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "");
    let tempRes = http.getUrl(newUrl, options);

    if (tempRes.status == 200) {
      recoName.push({ url: tempRes.parsed.img });
    }
  }

  return recoName;
}
utils.cocktailInfo = {
    id: undefined,
    name: undefined,
    category: undefined,
    abv: undefined,
    imageName: undefined,
    description: undefined,
    isbase: undefined,
    recoName: undefined,
    recoNamelist: undefined,
    material: undefined,
    subMaterial: undefined,
    type: undefined,
    image: undefined,
    majorCategory: undefined,
    subCategory: undefined
};

utils.options = {
  format: 'json',
  returnHeaders: true
};

utils.recipeInfo = {
    cocktail: undefined,
    cockware: undefined,
    method: undefined,
    capacity: undefined,
    steps: undefined,
    steplist: undefined
}

module.exports = utils;
