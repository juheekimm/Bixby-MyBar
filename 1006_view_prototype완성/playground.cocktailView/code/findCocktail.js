module.exports.function = function findCocktail (name) {
  const fakeData = require("./data/cocktailData.js");//더미데이터 먼저 가져옴(데이터 파일에서)
  const console = require("console");//디버깅 용으로 불러옴

  let cocktailInfo = null;
  //for문으로 파라미터로 받은 데이터와 같은지 보고 반환함
  for(let i = 0; i < fakeData.length; i++){
    if(fakeData[i].name == String(name)){
       cocktailInfo = fakeData[i];
       break;
    }
  }
  if(cocktailInfo == null) cocktailInfo = fakeData
  console.log(cocktailInfo);
  return cocktailInfo;
}