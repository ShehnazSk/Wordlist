var https = require('https');
var logger = require('./logger');

//reg exp to check if the responsedata is not html content
var htmlRegExp = /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i;

//Request parameters that are sent to oxford path is changed based on the user request of def/ant/syn/ex
var postRequest = {
  host: "od-api.oxforddictionaries.com",
  path: "/api/v1/entries/en/",
  port: "443",
  method: "GET",
  rejectUnauthorized: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': "application/json",
    'app_id': '99cad4c5',
    'app_key': '53d0c0df294133bda56e70c901e79aff'
  }
};

var getDefinitions = function(word) {
  try {
      postRequest.path = postRequest.path + word ;
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          // console.log(searchData);
          if(!htmlRegExp.test(searchData)){
            //console.log(searchData);
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
            // console.log(requiredData);

            logger.headingLogger(`Definitions of ${word}`)
            logger.resultsLogger(requiredData);
          }else{
            logger.messageLogger(`OOPS! Definitions of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}
var getSynonyms = function(word) {
  try {
      postRequest.path = postRequest.path + word + '/synonyms';
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data ;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].synonyms;
            logger.headingLogger(`Synonyms of ${word}`)
            logger.resultsLogger(requiredData);
            // console.log("Synonyms of "+ word);
            // console.log('----------------------');
            // console.log(requiredData);
          }else{
            logger.messageLogger(`OOPS! Synonyms of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}
var getAntonyms = function(word) {
  try {
      postRequest.path = postRequest.path + word + '/antonyms';
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].antonyms;
            logger.headingLogger(`Antonyms of ${word}`)
            logger.resultsLogger(requiredData);
          }else{
            logger.messageLogger(`OOPS! Antonyms of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}
var getExamples =function(word) {
  try {
      postRequest.path = postRequest.path + word ;
      var request = https.request(postRequest, function (response) {
        var searchData = "";
        response.on("data", function (data) {
          searchData = searchData + data;
        });
        response.on("end", function (data) {
          if(!htmlRegExp.test(searchData)){
            searchData = JSON.parse(searchData);
            var requiredData = searchData.results[0].lexicalEntries[0].entries[0].senses[0].examples;
            logger.headingLogger(`Examples of ${word}`)
            logger.resultsLogger(requiredData);
          }else{
            logger.messageLogger(`OOPS! Examples of ${word} not found try another`)
          }
        });
      });
      request.on('error', function (error) {
        logger.messageLogger('problem with request: ' + error.message, 'error');
      });
      request.write(JSON.stringify(word));
  } catch (e) {
    logger.messageLogger(e,'error')
  }
}

module.exports = {
  getDefinitions,
  getSynonyms,
  getAntonyms,
  getExamples
}