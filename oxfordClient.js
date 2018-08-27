var https = require('https');
var logger = require('./logger');

var postRequest = {
  host: "od-api.oxforddictionaries.com",
  path: "/api/v1/entries/en/",
  port: "443",
  method: "GET",
  rejectUnauthorized: false,
  headers: {
    'Content-Type': 'application/json',
    'app_id': '51abbb85',
    'app_key': '0ed42f0709ea5a3744e3d09553af188e'
  }
};

var getDef = (word,method) => {
  try {
    return new Promise((resolve, reject) => {
      let type = (method === 'definitions' || method === 'examples') ? '' : '/'+method;
      postRequest.path = postRequest.path + word + type;
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          searchData = JSON.parse(searchData);
          var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0][method];
          logger.rLogger(requiredData);
        });
      });

      request.on('error', function (error) {
        logger.eLogger('problem with request: ' + error.message);
      });

      request.write(JSON.stringify(word));
    })
  } catch (e) {
    logger.eLogger(e)
  }
}

module.exports = {
  getDef
}