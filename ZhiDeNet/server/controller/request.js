const request = require("node-fetch");
//封装的 简单fetch对象
module.exports = function fetch(url, options) {
  return new Promise((resolve, reject) => {
    request(url, options)
      .then((body) => body.json())
      .then((data) => resolve(data.data))
      .catch(reject);
  });
};
