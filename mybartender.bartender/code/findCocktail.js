var utils = require('./lib/utils');
var http = utils.http
var console = utils.console
var config = utils.config
var options = {
  format: 'json',
  returnHeaders: true
};
module.exports.function = function findCocktail(id, subText) {


  let cocktailInfo = utils.cocktailInfo

  let searchResult = {};
  let searchList = [];

  if (id == undefined) id = subText;

  searchResult = http.getUrl(config.get('search.url') + id, options);

  if (searchResult.status == 200) {
    if (searchResult.parsed.match.length == 1) {
      cocktailInfo = searchResult.parsed.match[0].data;
      cocktailInfo.id = searchResult.parsed.match[0].id;
      if (cocktailInfo.isbase == true) {
        if (cocktailInfo.recoName.length > 0 && cocktailInfo.recoName.indexOf(",") != -1) {
          cocktailInfo.recoNamelist = cocktailInfo.recoName.split(", ");
        }
        cocktailInfo.recoName = getRecoImage(cocktailInfo.recoName);
        console.log(cocktailInfo)
      }
      else {
        if (cocktailInfo.category.length > 0) {
          if (cocktailInfo.category.indexOf(", ") != -1) {
            cocktailInfo.category = (cocktailInfo.category.split(","))[0];
          }
          cocktailInfo.subCategory = searchResult.parsed.match[0].data.category;
        }
      }

      if (cocktailInfo.majorCategory == undefined) cocktailInfo.majorCategory = " ";
      searchList.push(cocktailInfo);
    }

    if (searchResult.parsed.other.length > 0) {
      for (let index = 0; index < searchResult.parsed.other.length; index++) {
        cocktailInfo = searchResult.parsed.other[index].data;
        cocktailInfo.id = searchResult.parsed.other[index].id;
        cocktailInfo.subCategory = searchResult.parsed.other[0].data.category;

        if (cocktailInfo.category.length > 0) {
          if (cocktailInfo.category.split(",").length >= 1) {
            cocktailInfo.category = (cocktailInfo.category.split(","))[0];
          }
        }
        searchList.push(cocktailInfo);
      }
    }
    return searchList;
  }

}

function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

function getRecoImage(names) {
  let recoSplit = names.split(',');
  let recoName = [];

  for (let i = 0; i < recoSplit.length; i++) {
    let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "");
    let tempRes = http.getUrl(newUrl, options);
    console.log(tempRes)
    if (tempRes.status == 200 && tempRes.parsed.data != undefined) {
      recoName.push({ url: tempRes.parsed.data.image });
    }
  }
  return recoName;
}