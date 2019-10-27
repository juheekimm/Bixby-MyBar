module.exports.function = function findCategory(category, page) {
  const utils = require('./lib/utils');
  const objects = require('./lib/objects');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  const options = utils.options

  let searchResult = {};
  let searchList = [];
  let cocktailInfo = objects.cocktailInfo

  searchResult = http.getUrl(config.get('category.url') + category, options);

  if (searchResult.status == 200) {
    for (let index = 0; index < searchResult.parsed.length; index++) {
      cocktailInfo = searchResult.parsed[index].data;
      cocktailInfo.subCategory = searchResult.parsed[index].data.category;
      cocktailInfo.id = searchResult.parsed[index].id;

      if (cocktailInfo.subCategory.length > 0) {
        if (cocktailInfo.subCategory.split(",").length >= 1) {
          cocktailInfo.category = (cocktailInfo.subCategory.split(","))[0];
        }
      }
      if(cocktailInfo.subMaterial == "")   { cocktailInfo.subMaterial   = "야호"};
      if(cocktailInfo.majorCategory == "") { cocktailInfo.majorCategory = " " };
      searchList.push(cocktailInfo);
    }
  }

  return searchList
}
