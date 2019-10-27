module.exports.function = function findMajorList(repId) {
  const utils = require('./lib/utils');
  const objects = require('./lib/objects');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  const options = utils.options
  
  let searchResult = {};
  let searchList = [];
  let cocktailInfo = objects.cocktailInfo

  searchResult = http.getUrl(config.get('categorySearch.url') + repId, options);
  if (searchResult.status == 200) {
    for (let index = 0; index < searchResult.parsed[0].data.length; index++) {
      cocktailInfo = searchResult.parsed[0].data[index].data;
      cocktailInfo.subCategory = searchResult.parsed[0].data[index].data.category;
      cocktailInfo.id = searchResult.parsed[0].data[index].id;
      if (cocktailInfo.subCategory.length > 0) {
        if (cocktailInfo.subCategory.split(",").length >= 1) {
          cocktailInfo.category = (cocktailInfo.subCategory.split(","))[0];
        }
      }
      if(cocktailInfo.subMaterial == "" || cocktailInfo.subMaterial == undefined)   { cocktailInfo.subMaterial   = ""};
      if(cocktailInfo.majorCategory == "" || cocktailInfo.majorCategory == undefined) { cocktailInfo.majorCategory = " " };
      cocktailInfo.type = "대표"
      searchList.push(cocktailInfo);
    }
  }
  return searchList
}
