//카테고리
var http = require('http') //http라이브러리를 불러옴
var console = require('console')
var config = require('config')
module.exports.function = function findCategory(category, page) {
  let utils = require('lib/utils.js')
  //옵션변수 설정  
  let options = {
    format: 'json',
    returnHeaders: true
  };
  //검색용 변수
  let searchResult = {}
  //리스트 변수
  let searchList = [] //여기에 칵테일 객체들 담아서 반환
  //검색결과 객체
  //아이디, 이름, 카테고리, 도수, 이미지이름, 설명, 베이스여부, 추천이미지, 필수재료, 서브재료
  let cocktailInfo = {
    id: undefined,
    name: undefined,
    category : undefined,
    abv: undefined,
    imageName: undefined,
    description: undefined,
    isbase: undefined,
    recoName: undefined,
    material: undefined,
    subMaterial: undefined,
    type: undefined,
    image: undefined,
    majorCategory: undefined,
    subCategory : undefined
  }
  searchResult = http.getUrl(config.get('category.url') + category, options)

  if (searchResult.status == 200) {
    //match.length == 0 -> category로 검색한 결과를 찾았어요
    //match.length != 0 -> 어차피 전체 리스트 받아서 할거지만 match를 맨위로 보내둠
    for (let index = 0; index < searchResult.parsed.length; index++) {
      cocktailInfo = searchResult.parsed[index].data
      cocktailInfo.subCategory = searchResult.parsed[index].data.category
      cocktailInfo.id = searchResult.parsed[index].id
      
      if (cocktailInfo.subCategory.length > 0) {               //카테고리가 있는데
        if (cocktailInfo.subCategory.split(",").length >= 1) { //split할 수 있으면 첫번째를 대표카테고리로
          cocktailInfo.category = (cocktailInfo.subCategory.split(","))[0];
        }
      }
      // if (cocktailInfo.category == undefined)
      //   cocktailInfo.category = "상큼한"

      cocktailInfo.majorCategory = " "
      // }
      searchList.push(cocktailInfo)
    }
  }

  return searchList
}
