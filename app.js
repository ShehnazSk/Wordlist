var logger = require('./logger');
var oxford = require('./oxfordClient');
// console.log(logger);

let func = process.argv[2];
let type = process.argv[3] || null;
let word = process.argv[4] || null;

if(func !== 'dict'){
  logger.eLogger('Wrong keyword, enter <dict> <def/syn/snt/ex> <word>');
}else if(func === 'dict' && type === 'def' && word !== null){
  let method = 'definitions';
  logger.hLogger(`${method} of ${word}`);
  oxford.getDef(word,method);
}else if(func === 'dict' && type === 'syn' && word !== null){
  let method = 'synonyms';
  logger.hLogger(`${method} of ${word}`);
  oxford.getDef(word,method);
}else if(func === 'dict' && type === 'ant' && word !== null){
  let method = 'antonyms';
  logger.hLogger(`${method} of ${word}`);
  oxford.getDef(word,method);
}else if(func === 'dict' && type === 'ex' && word !== null){
  let method = 'examples';
  logger.hLogger(`${method} of ${word}`);
  oxford.getDef(word,method);
}else {
  logger.eLogger('Wrong keyword, enter <dict> <def/syn/snt/ex> <word>');
}

