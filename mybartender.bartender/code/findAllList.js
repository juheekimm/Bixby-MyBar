module.exports.function = function findAllList() {
  const utils = require('./lib/utils');
  const http = utils.http
  const console = utils.console
  const config = utils.config
  const options = utils.options

  let searchResult = {};
  let searchList = [];
  
  let majors = {
    repId: undefined,
    repName: undefined,
    majorImage:undefined,
    description:undefined
  }

  searchResult = http.getUrl(config.get('categoryList.url'), options);
  
  if (searchResult.status == 200) {
    for (let index = 0; index < searchResult.parsed.length; index++) {
      majors = {}
      let temp = searchResult.parsed[index]
      majors.repId = temp.id;
      majors.repName = temp.name;
      majors.majorImage = temp.img;
      majors.description = temp.desc;
      searchList.push(majors)
    }
  }
  return searchList
}
