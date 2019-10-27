module.exports.function = function findCocktail(id, subText) {
  const utils = require('./lib/utils');
  const objects = require('./lib/objects');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  const options = utils.options
  let cocktailInfo = objects.cocktailInfo

  let searchResult = {};
  let searchList = [];

  if (id == undefined) id = subText;

  searchResult = http.getUrl(config.get('search.url') + id, options);

  if (searchResult.status == 200) {
    //정확히 매칭된 칵테일
    if (searchResult.parsed.match.length == 1) {
      cocktailInfo = searchResult.parsed.match[0].data;
      cocktailInfo.id = searchResult.parsed.match[0].id;
      //다른 술의 베이스가 되는 경우 해당 술로 만들 수 있는 칵테일 추천 정보 삽입
      if (cocktailInfo.isbase == true) {
        if (cocktailInfo.recoName.length > 0 && cocktailInfo.recoName.indexOf(",") != -1) {
          cocktailInfo.recoList = cocktailInfo.recoName.split(", ");
        }
        cocktailInfo = getRecoImage(cocktailInfo);
      }
      //베이스가 아닌경우 카테고리가 나뉘므로 카테고리 정보 추가
      else {
        if (cocktailInfo.category.length > 0) {
          if (cocktailInfo.category.indexOf(", ") != -1) {
            cocktailInfo.category = (cocktailInfo.category.split(","))[0];
          }
          cocktailInfo.subCategory = searchResult.parsed.match[0].data.category;
        }
      }
      //메이저 카테고리가 없는경우 빈 스트링으로 처리
      if (cocktailInfo.majorCategory == undefined) cocktailInfo.majorCategory = " ";
      searchList.push(cocktailInfo);
    }
    cocktailInfo.imageName = " "

    // 유사칵테일
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
        if(cocktailInfo.majorCategory == undefined)
          cocktailInfo.majorCategory = " ";
        searchList.push(cocktailInfo);
      }
    }
    console.log(searchList)
  
    return searchList;
  }

}
