module.exports.function = function findAllList() {
  const utils = require('./lib/utils');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  const options = utils.options

  let searchResult = {};
  //음 여기가 중요한데
  //id, name, data,
  let idList = [];
  let nameList = [];

  let searchList = [];
  let majors = {
    repId: undefined,
    repName: undefined,
    cocktail: undefined,
    majorImage:undefined,
    description:undefined
  }
  let cocktails = []
  let cocktailInfo = utils.cocktailInfo

  searchResult = http.getUrl(config.get('categoryList.url'), options);
  
  if (searchResult.status == 200) {
    for (let index = 0; index < searchResult.parsed.length; index++) {
      majors = {}
      cocktailInfo = {}
      cocktails = []
      let temp = searchResult.parsed[index]
      majors.repId = temp.id;
      majors.repName = temp.name;
      for (let innerIndex = 0; innerIndex < temp.data.length; innerIndex++) {
        cocktailInfo = temp.data[innerIndex].data;
        cocktailInfo.subCategory = temp.data[innerIndex].data.category;
        //여기 문제 
        cocktailInfo.id = temp.data[innerIndex].id;
        if (cocktailInfo.subCategory.length > 0) {
          if (cocktailInfo.subCategory.split(",").length >= 1) {
            cocktailInfo.category = (cocktailInfo.subCategory.split(","))[0];
          }
        }
        cocktailInfo.majorCategory = " ";
        cocktails.push(cocktailInfo);
      }
      majors.cocktail = cocktails
      majors.majorImage = temp.img;
      majors.description = temp.desc;
      console.log(majors)
      if(majors.cocktail.length != 0)
        searchList.push(majors)
    }
    
  }
  console.log(searchList)
  return searchList
}
