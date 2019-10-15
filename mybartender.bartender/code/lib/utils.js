var http = require('http') //http라이브러리를 불러옴
var console = require('console')
var config = require('config')
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}
function getRecoImage(cocktailInfo) {
  let recoSplit = cocktailInfo.recoName.split(',')
  let recoName = []
  for (let i = 0; i < recoSplit.length; i++) {
    let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "")
    let tempRes = http.getUrl(newUrl, options)
    if (tempRes.status == 200) {
      recoName.push({ url: tempRes.parsed.img })
    }
  }
  return recoName
}