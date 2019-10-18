// var http = require('http');
// var console = require('console');
// var config = require('config');
// var options = {
//   format: 'json',
//   returnHeaders: true
// };

// module.exports.function = function findCocktail(id, subText) {
//   const utils = require('lib/utils.js');
  
//   let searchResult = {};
  
//   let searchList = []; 
  
//   let cocktailInfo = {
//     id: undefined,
//     name: undefined,
//     category: undefined,
//     abv: undefined,
//     imageName: undefined,
//     description: undefined,
//     isbase: undefined,
//     recoName: undefined,
//     recoNamelist: undefined,
//     material: undefined,
//     subMaterial: undefined,
//     type: undefined,
//     image: undefined,
//     majorCategory: undefined,
//     subCategory: undefined
//   };

//   if (id == undefined) id = subText;

//   searchResult = http.getUrl(config.get('search.url') + id, options);

//   if (searchResult.status == 200) {

//     if (searchResult.parsed.match.length == 1) {
//       cocktailInfo = searchResult.parsed.match[0].data;
      
//       if (!cocktailInfo.isbase && cocktailInfo.category.length > 0) {
//         if (cocktailInfo.category.split(",").length >= 1) {
//           cocktailInfo.category = (cocktailInfo.category.split(","))[0];
//         }
//         cocktailInfo.subCategory = searchResult.parsed.match[0].data.category;
//       }

//       cocktailInfo.id = searchResult.parsed.match[0].id;

//       if (cocktailInfo.isbase == true) {
//         if (cocktailInfo.recoName.length > 0 && cocktailInfo.recoName.split(",").length >= 1) {
//           cocktailInfo.recoNamelist = cocktailInfo.recoName.split(", ");
//         }
//         cocktailInfo.recoName = getRecoImage(cocktailInfo.recoName);
//       }
//       if (cocktailInfo.majorCategory == null ||
//         cocktailInfo.majorCategory == undefined) cocktailInfo.majorCategory = " ";
//       searchList.push(cocktailInfo);
//     }

//     if (searchResult.parsed.other.length > 0) {
//       for (let index = 0; index < searchResult.parsed.other.length; index++) {
//         cocktailInfo = searchResult.parsed.other[index].data;
//         cocktailInfo.id = searchResult.parsed.other[index].id;
//         cocktailInfo.subCategory = searchResult.parsed.other[0].data.category;

//         if (cocktailInfo.category.length > 0) {
//           if (cocktailInfo.category.split(",").length >= 1) {
//             cocktailInfo.category = (cocktailInfo.category.split(","))[0];
//           }
//         }
//         searchList.push(cocktailInfo);
//       }
//     }
//   }
//   return searchList;
// }

// function replaceAll(str, searchStr, replaceStr) {
//   return str.split(searchStr).join(replaceStr);
// }

// function getRecoImage(names) {
//   let recoSplit = names.split(',');
//   let recoName = [];

//   for (let i = 0; i < recoSplit.length; i++) {
//     let newUrl = config.get('single.url') + replaceAll(recoSplit[i], " ", "");
//     newUrl = newUrl.replace(" ", "");
//     let tempRes = http.getUrl(newUrl, options);

//     if (tempRes.status == 200) {
//       if (tempRes.parsed.data != null) {
//         recoName.push({ url: tempRes.parsed.data.image });
//       }
//     }
//   }
//   return recoName;
// }
module.exports.function = function findCocktail(id, subText) {
  const utils = require('./lib/utils.js');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  let cocktailInfo = utils.cocktailInfo
  const options = utils.options

  let searchResult = {};
  let searchList = [];


  if (id == undefined) id = subText;

  searchResult = http.getUrl(config.get('search.url') + id, options);

  if (searchResult.status == 200) {

    if (searchResult.parsed.match.length == 1) {
      cocktailInfo = searchResult.parsed.match[0].data;

      if (!cocktailInfo.isbase && cocktailInfo.category.length > 0) {
        if (cocktailInfo.category.split(",").length >= 1) {
          cocktailInfo.category = (cocktailInfo.category.split(","))[0];
        }
        cocktailInfo.subCategory = searchResult.parsed.match[0].data.category;
      }

      cocktailInfo.id = searchResult.parsed.match[0].id;

      if (cocktailInfo.isbase == true) {
        if (cocktailInfo.recoName.length > 0 && cocktailInfo.recoName.split(",").length >= 1) {
          cocktailInfo.recoNamelist = cocktailInfo.recoName.split(", ");
        }
        cocktailInfo.recoName = getRecoImage(cocktailInfo.recoName);
      }
      if (cocktailInfo.majorCategory == undefined) cocktailInfo.majorCategory = " ";
      searchList.push(cocktailInfo);
    }

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
        searchList.push(cocktailInfo);
      }
    }
    return searchList;
  }
}