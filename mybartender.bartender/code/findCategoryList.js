var http = require('http') //http라이브러리를 불러옴
var console = require('console')
var config = require('config')
module.exports.function = function findCategoryList(category, page) {
  let utils = require('lib/utils.js')
  //옵션변수 설정  
  let options = {
    format: 'json',
    returnHeaders: true
  };

  let searchList = [] //여기에 칵테일 객체들 담아서 반환
  //검색결과 객체
  //아이디, 이름, 카테고리, 도수, 이미지이름, 설명, 베이스여부, 추천이미지, 필수재료, 서브재료
  // let cocktailInfo ={}
  let searchResult = {}
  let cocktailInfo = {
    id: undefined,
    name: undefined,
    category: undefined,
    abv: undefined,
    imageName: undefined,
    description: undefined,
    isbase: undefined,
    recoName: undefined,
    material: undefined,
    subMaterial: undefined,
    type: undefined,
    image: undefined,
    majorCategory: undefined
  }
  let categoryList = {
    cocktail: undefined,
    isAll: undefined
  }
  const categoryData = require("./majorCategory.js")
  let check = {}
  if (category == undefined) {

    for (let i = 0; i < categoryData.length; i++) {

      searchResult = http.getUrl(config.get('category.url') + categoryData[i], options)
      
      if (searchResult.status == 200 && searchResult.parsed[0] != undefined) {
        // console.log("안녕1")
        // console.log(searchResult.parsed[0])
        cocktailInfo = searchResult.parsed[0].data
        cocktailInfo.id = searchResult.parsed[0].id
        
        if (cocktailInfo.category.length > 0) {               //카테고리가 있는데
          if (cocktailInfo.category.indexOf(", ") == -1) {   //split할 수 없는 상황(카테고리가 하나)에 대한 예외 처리
            cocktailInfo.majorCategory = cocktailInfo.category;
          } else if (cocktailInfo.category.split(", ").length >= 1) { //split할 수 있으면 첫번째를 대표카테고리로
            cocktailInfo.majorCategory = (cocktailInfo.category.split(", "))[0];
          }
        } else {
          cocktailInfo.majorCategory = "";
        }
        // console.log("안녕2")
        // console.log(cocktailInfo)
        categoryList.cocktail = cocktailInfo
        categoryList.isAll = true
        searchList.push(categoryList)
      }
      categoryList = {}
      searchResult = {}
    }
  } else {
    searchResult = http.getUrl(config.get('category.url') + category, options)
    if (searchResult.status == 200) {
      //match.length == 0 -> category로 검색한 결과를 찾았어요
      //match.length != 0 -> 어차피 전체 리스트 받아서 할거지만 match를 맨위로 보내둠
      
      for (let index = 0; index < searchResult.parsed.length; index++) {
        cocktailInfo = searchResult.parsed[index].data
        cocktailInfo.id = searchResult.parsed[index].id
        categoryList.cocktail = cocktailInfo
        categoryList.isAll = false
        searchList.push(categoryList)
      }
    }
    searchResult = {}
  }
  return searchList
}


function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
