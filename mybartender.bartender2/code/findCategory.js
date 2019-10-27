module.exports.function = function findCategory(category, page) {
  const utils = require('./lib/utils');
  const objects = require('./lib/objects');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  const options = utils.options

  let searchResult = {};
  let searchList = [];
  let cocktailInfo = objects.cocktailInfo;
  let testInfo = objects.testInfo;
  searchResult = http.getUrl(config.get('category.url') + category, options);

  if (searchResult.status == 200) {
    for (let index = 0; index < searchResult.parsed.length; index++) {
      let temp = searchResult.parsed[index];
      testInfo.id = temp.id;
      testInfo.name = temp.data.name;
      testInfo.image = temp.data.image;
      testInfo.category = temp.data.category;
      testInfo.abv = temp.data.abv;
      testInfo.description = temp.data.description;
      testInfo.material = temp.data.material;
      testInfo.subMaterial = temp.data.subMaterial;
      testInfo.isbase = temp.data.isbase;
      testInfo.subCategory = temp.data.category;

      if (testInfo.subCategory.length > 0) {
        if (testInfo.subCategory.split(",").length >= 1) {
          testInfo.category = (testInfo.subCategory.split(","))[0];
        }
      }
      if(testInfo.subMaterial == "" || testInfo.subMaterial == undefined)   { testInfo.subMaterial   = ""};
      testInfo.type = "카테고리"
      searchList.push(testInfo);
      testInfo = {};
    }
  }
  console.log(searchList)
  return searchList
}
