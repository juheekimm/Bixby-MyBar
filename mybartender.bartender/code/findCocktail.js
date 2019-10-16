//import getRecoImage from 'utils/getImages.js';
//http,console,config 호출

var http = require('http') //http라이브러리를 불러옴
var console = require('console')
var config = require('config')
var options = {
  format: 'json',
  returnHeaders: true
};
// .function = function idSet(){
// let idset = new Set(
module.exports.function = function findCocktail(id, subText) {
  const utils = require('lib/utils.js')
  //옵션변수 설정  

  //검색용 변수
  let searchResult = {}
  //리스트 변수
  let searchList = [] //여기에 칵테일 객체들 담아서 반환
  //검색결과 객체
  //아이디, 이름, 카테고리, 도수, 이미지이름, 설명, 베이스여부, 추천이미지, 필수재료, 서브재료
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
    majorCategory: undefined,
    subCategory : undefined
  }
  if (id == undefined) id = subText
  searchResult = http.getUrl(config.get('search.url') + id, options)
  if (searchResult.status == 200) {
    

    if (searchResult.parsed.match.length == 1) {
      //첫번째 칵테일 정보
      cocktailInfo = searchResult.parsed.match[0].data
      cocktailInfo.subCategory = searchResult.parsed.match[0].data.category;
      if (cocktailInfo.category.length > 0) {               //카테고리가 있는데
        if (cocktailInfo.category.split(",").length >= 1) { //split할 수 있으면 첫번째를 대표카테고리로
          cocktailInfo.category = (cocktailInfo.category.split(","))[0];
        }
      }
      
      cocktailInfo.id = searchResult.parsed.match[0].id
      if (cocktailInfo.isbase == true) {
        cocktailInfo.recoName = getRecoImage(cocktailInfo.recoName)
      }
      if (cocktailInfo.majorCategory == null ||
        cocktailInfo.majorCategory == undefined) cocktailInfo.majorCategory = " "

      searchList.push(cocktailInfo)
    }
    //other 하나씩 까셈
    if (searchResult.parsed.other.length > 0) {
      for (let index = 0; index < searchResult.parsed.other.length; index++) {
        cocktailInfo = searchResult.parsed.other[index].data
        cocktailInfo.id = searchResult.parsed.other[index].id
        searchList.push(cocktailInfo)
      }
    }
  }
  return searchList
}
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}
function getRecoImage(names) {
  let recoSplit = names.split(',')
  let recoName = []
  for (let i = 0; i < recoSplit.length; i++) {


    let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "")
    newUrl = newUrl.replace(" ", "")
    let tempRes = http.getUrl(newUrl, options)
    if (tempRes.status == 200) {
      if (tempRes.parsed.data != null) {
        recoName.push({ url: tempRes.parsed.data.image })
      }
    }
  }
  return recoName
}
