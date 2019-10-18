module.exports.function = function findCocktail(id, subText) {
  const utils = require('./lib/utils');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  const options = utils.options

  let cocktailInfo = utils.cocktailInfo
  let searchResult = {};
  let searchList = [];


  if (id == undefined) id = subText;

  searchResult = http.getUrl(config.get('search.url') + id, options);

  if (searchResult.status == 200) {

    if (searchResult.parsed.match.length == 1) {
      cocktailInfo = searchResult.parsed.match[0].data;
      console.log(cocktailInfo)
      if (!cocktailInfo.isbase && cocktailInfo.category.length > 0) {
        if (cocktailInfo.category.split(",").length >= 1) {
          cocktailInfo.category = (cocktailInfo.category.split(","))[0];
        }
        cocktailInfo.subCategory = searchResult.parsed.match[0].data.category;
      }

      cocktailInfo.id = searchResult.parsed.match[0].id;

      if (cocktailInfo.isbase == true) {
        if (cocktailInfo.recoName.length > 0 && cocktailInfo.recoName.split(",").length >= 1) {
          cocktailInfo.recoNamelist = cocktailInfo.recoName.split(", ");
        }
        cocktailInfo.recoName = getRecoImage(cocktailInfo.recoName);
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