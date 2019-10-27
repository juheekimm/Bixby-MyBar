module.exports.function = function findABV(abv, keyword) {

  const utils = require('./lib/utils');
  const objects = require('./lib/objects');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  
  let searchResult = {};
  let searchList = [];
  let cocktailInfo = objects.cocktailInfo

  let state = 0;  //non-state
  //state 
  //1 : 낮은 도수 
  //2 : 중간 도수
  //3 : 높은 도수
  //4 : n도 보다 낮은 도수
  //5 : n도랑 비슷한 수준의 도수
  //6 : n도 보다 높은 도수
  let url = "";
  if (abv == undefined) {
    url = config.get('abv.url');
    if (keyword == '낮은') state = 1;
    else if (keyword == '중간') state = 2;
    else if (keyword == '높은') state = 3;
  }
  else {
    url = config.get('abvNum.url');
    if (keyword == '낮은') state = 4;
    else if (keyword == '중간') state = 5;
    else if (keyword == '높은') state = 6;
  }

  switch (state) {
    case 1:
      url += 'a';
      break;
    case 2:
      url += 'b';
      break;
    case 3:
      url += 'c';
      break;
    case 4:
      url += abv + '/a';
      break;
    case 5:
      url += abv + '/b';
      break;
    case 6:
      url += abv + '/c';
      break;
  }
  console.log(state)
  if (state != 0) {
    searchResult = http.getUrl(url, {
      format: 'json',
      returnHeaders: true
    });
    console.log(cocktailInfo);
    console.log(searchResult);
    if (searchResult.status == 200) {
      for (let index = 0; index < searchResult.parsed.length; index++) {
        let temp = searchResult.parsed[index];
        cocktailInfo = temp.data;
        cocktailInfo.subCategory = temp.data.category;
        cocktailInfo.id = temp.id;

        if (cocktailInfo.isbase == true) {
          if (cocktailInfo.recoName.length > 0 && cocktailInfo.recoName.indexOf(",") != -1) {
            cocktailInfo.recoList = cocktailInfo.recoName.split(", ");
          }
          cocktailInfo = utils.getRecoImage(cocktailInfo);
        }
        //베이스가 아닌경우 카테고리가 나뉘므로 카테고리 정보 추가
        else {
          if (cocktailInfo.category.length > 0) {
            cocktailInfo.subCategory = cocktailInfo.category;
            if (cocktailInfo.category.indexOf(", ") != -1) {
              cocktailInfo.category = (cocktailInfo.category.split(","))[0];
            }
          }
        }
        if (temp.data.subMaterial == "") { cocktailInfo.subMaterial = " " };
        if (temp.data.majorCategory == "") { cocktailInfo.majorCategory = " " };
        searchList.push(cocktailInfo);
      }
    }
  }
  console.log(searchList)
  return searchList
}
// abvLowerabvInabvUpper

//도수 높은 칵테일 알려줘 30
//도수 낮은 칵테일 알려줘 15
//중간 도수 칵테일 알려줘 15~30
//20도 짜리 칵테일 알려줘
// [SSAFY-김준목] [오후 7:28] /abvsearch/:id/:level
// [SSAFY-김준목] [오후 7:28] id = number
// [SSAFY-김준목] [오후 7:28] level = a,b,c

//(도수), (높은)
//(도수), (중간)
//(도수), (낮은)
//(20도) 이십도
//(20)(도) 
//10
//숫자만 인식하는 쪽으로 해보자
//Integer(Optional), Page(Optional), Keyword(Requried)
//숫자가 있으면 
//20도보다 높은 술 알려줘하면
//integer 