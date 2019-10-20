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

utils.recipeInfo = {
    cocktail: undefined,
    cockware: undefined,
    method: undefined,
    capacity: undefined,
    steps: undefined,
    steplist: undefined
}

module.exports = utils;
