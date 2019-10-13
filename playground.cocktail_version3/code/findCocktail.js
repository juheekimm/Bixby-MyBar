//import getRecoImage from 'utils/getImages.js';
//http,console,config 호출
var http = require('http')
var console = require('console')
var config = require('config')

function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

module.exports.function = function findCocktail(id) {

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
    category: undefined,
    abv: undefined,
    imageName: undefined,
    description: undefined,
    isbase: undefined,
    recoName: undefined,
    material: undefined,
    subMaterial: undefined,
    type: undefined,
    image : undefined
  }
  searchResult = http.getUrl(config.get('search.url') + id, options)

  if (searchResult.status == 200) {
    //match.length == 0 -> name으로 검색한 결과를 찾았어요
    //match.length != 0 -> 어차피 전체 리스트 받아서 할거지만 match를 맨위로 보내둠

    if (searchResult.parsed.match.length == 1) {
      //첫번째 칵테일 정보

      cocktailInfo = searchResult.parsed.match[0].data
      cocktailInfo.id = searchResult.parsed.match[0].id
      // cocktailInfo.image = searchResult.parsed.match[0].img
      if (cocktailInfo.isbase == true) {
        cocktailInfo.recoName = getRecoImage(cocktailInfo)
      }
      //매치된 칵테일이 존재한다면 첫번째 객체로 삽입
      searchList.push(cocktailInfo)
    }
    //other 하나씩 까셈
    if (searchResult.parsed.other.length > 0) {
      for (let index = 0; index < searchResult.parsed.other.length; index++) {
        cocktailInfo = searchResult.parsed.other[index].data
        cocktailInfo.id = searchResult.parsed.other[index].id
        // cocktailInfo.image = searchResult.parsed.other[index].img
        searchList.push(cocktailInfo)
      }
    }
  }
  return searchList
}

function getRecoImage(cocktailInfo) {
  let recoSplit = cocktailInfo.recoName.split(',')
  let recoName = []
  for (let i = 0; i < recoSplit.length; i++) {
    let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "")
    let tempRes = http.getUrl(newUrl, options)
    if (tempRes.status == 200) {
      recoName.push({ url: tempRes.parsed.data.img })
    }
  }
  return recoName
}