var http = require('http')
var console = require('console')
var config = require('config')
var utils = {};

utils.http = http
utils.console = console
utils.config = config
utils.options = {
  format: 'json',
  returnHeaders: true
};


utils.cocktailInfo = {
    id: undefined,
    name: undefined,
    category: undefined,
    majorCategory: undefined,
    subCategory: undefined,
    abv: undefined,
    description: undefined,
    isbase: undefined,
    image: undefined,
    material: undefined,
    subMaterial: undefined,
    recoName: undefined,
    recoList: undefined,
    recoImage : undefined,
    recoABV : undefined,
    recoDescription : undefined,
    type: undefined,
    imageName: undefined
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
