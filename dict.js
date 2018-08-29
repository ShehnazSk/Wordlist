var logger = require('./logger');
var oxford = require('./oxfordClient');

//fetching type and word from cli if nothing was passed considering null
var type = process.argv[2] || null;
var word = process.argv[3] || null;

//list to help users the available keyword
var helpers = [
  'Definitions :def <word>',
  'Synonyms : dict syn <word>',
  'Antonyms : dict ant <word>',
  'Examples : dict ex <word>',
  'Dictonary : dict dict <word> / dict <word>',
  'Word of the day : dict',
  'Play : dict play',
]

if(type === 'def' && word !== null){
  oxford.getDefinitions(word)
}
else if(type === 'syn' && word !== null){
  oxford.getSynonyms(word)
}
else if(type === 'ant' && word !== null){
  oxford.getAntonyms(word)
}
else if(type === 'ex' && word !== null){
  oxford.getExamples(word)
}
else if(type === 'play' && word === null){
  logger.messageLogger('Game is under development.');
}
else if(type === null && word === null){
  logger.messageLogger('OOPS! Word of the not availabe');
}
else if((type === 'dict' && word !== null) || (type !== null && word === null)){
  logger.messageLogger('OOPS! Full Dictonary under development');
}
else{
  logger.messageLogger('Wrong keyword!, below are the supported one','error');
  logger.resultsLogger(helpers);
}


