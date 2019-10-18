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
    subCategory : undefined,
    subText:undefined
  }
  if (id == undefined) id = subText
  searchResult = http.getUrl(config.get('search.url') + id, options)
  if (searchResult.status == 200) {
    let result = searchResult.parsed.match[0]
    cocktailInfo = result.data
    cocktailInfo.id = result.id
    console.log(result.data.category)
    console.log(cocktailInfo)
    if(result.data.category.indexOf(",") == -1){
      console.log("야호")
    }
    cocktailInfo.category = result.category.split(", ")
    // if (searchResult.parsed.match.length > 0) {
    //   cocktailInfo = searchResult.parsed.match[0].data
    //   cocktailInfo.id = searchResult.parsed.match[0].id
    //   if (cocktailInfo.isbase == true) {
    //     cocktailInfo.recoName = getRecoImage(cocktailInfo.recoName)
    //   }
    //   if (cocktailInfo.majorCategory == undefined) cocktailInfo.majorCategory = "無"
    //   searchList.push(cocktailInfo)
    // }
    // //other 하나씩 까셈
    // if (searchResult.parsed.other.length > 0) {
    //   for (let index = 0; index < searchResult.parsed.other.length; index++) {
    //     cocktailInfo = searchResult.parsed.other[index].data
    //     cocktailInfo.id = searchResult.parsed.other[index].id
    //     // cocktailInfo.image = searchResult.parsed.other[index].img
    //     searchList.push(cocktailInfo)
    //   }
    // }
  }
  console.log(searchList)
  return searchList
}
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}
function getRecoImage(names) {
  let recoSplit = names.split(',')
  let recoName = []
  for (let i = 0; i < recoSplit.length; i++) {
    // for(let i = 0; i < 1; i ++){

    let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "")
    newUrl = newUrl.replace(" ", "")
    let tempRes = http.getUrl(newUrl, options)
    // console.log(tempRes.parsed)
    // console.log(tempRes.parsed.data)
    // console.log(tempRes.parsed.data.image)
    // console.log(tempRes.parsed[0])
    // console.log(tempRes.parsed[0].img)
    // console.log(tempRes.parsed[0].image)
    // console.log(tempRes.parsed[0].data)
    if (tempRes.status == 200) {
      if (tempRes.parsed.data != null) {
        recoName.push({ url: tempRes.parsed.data.image })
      }
    }
  }
  return recoName
}
// if (searchResult.parsed.match.length == 1) {
//       //첫번째 칵테일 정보

//       cocktailInfo = searchResult.parsed.match[0].data
//       cocktailInfo.id = searchResult.parsed.match[0].id
//       cocktailInfo.image = searchResult.parsed.match[0].img
//       if (cocktailInfo.isbase == true) {
//         cocktailInfo.recoName = getRecoImage(cocktailInfo)
//       }
//       //매치된 칵테일이 존재한다면 첫번째 객체로 삽입
//       searchList.push(cocktailInfo)
//     }
//     //other 하나씩 까셈
//     if (searchResult.parsed.other.length > 0) {
//       for (let index = 0; index < searchResult.parsed.other.length; index++) {
//         cocktailInfo = searchResult.parsed.other[index].data
//         cocktailInfo.id = searchResult.parsed.other[index].id
//         cocktailInfo.image = searchResult.parsed.other[index].img
//         searchList.push(cocktailInfo)
//       }
//     }