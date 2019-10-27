var http = require('http')
var console = require('console')
var config = require('config')
var utils = {};
var options = {
  format: 'json',
  returnHeaders: true
};
utils.http = http
utils.console = console
utils.config = config
utils.options = options

utils.replaceAll = function (str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

utils.getRecoImage = function (cocktailInfo) {
  let names = cocktailInfo.recoName
  let recoImages = [];
  let recoABVs = [];
  let recoDescriptions = [];

  for (let i = 0; i < cocktailInfo.recoList.length; i++) {
    let newUrl = config.get('single.url') + utils.replaceAll(cocktailInfo.recoList[i], " ", "");
    let tempRes = http.getUrl(newUrl, utils.options);
    console.log(tempRes)
    if (tempRes.status == 200 && tempRes.parsed.data != undefined) {
      recoImages.push(tempRes.parsed.data.image);
      recoABVs.push(tempRes.parsed.data.abv);
      recoDescriptions.push(tempRes.parsed.data.description);
    }
  }
  cocktailInfo.recoImage = recoImages;
  cocktailInfo.recoABV = recoABVs;
  cocktailInfo.recoDescription = recoDescriptions;
  
  return cocktailInfo;
}

module.exports = utils;
