
const eLogger = (message) => {
  var liner = '-'
  for(let i =0; i<= message.length; i++){
    liner += '-';
  }
  console.log(liner);
  console.log('\x1b[31m%s\x1b[0m', ` ${message}`);
  console.log(liner);
}

const rLogger = (results) => {
  // var liner = '-'
  // for(let i =0; i<= message.length; i++){
  //   liner += '-';
  // }
  // console.log(liner);
  // console.log('\x1b[31m%s\x1b[0m', ` ${message}`);
  // console.log(liner);
  let result = ''
  results.forEach(r => {
    if(typeof r === 'string'){
      result += r + '\n';
    }else{
      result += r.text + '\n'
    }
  });
  console.log(result);
}

const hLogger = (message) =>{
  var liner = '-'
  for(let i =0; i<= message.length; i++){
    liner += '-';
  }
  console.log('\x1b[32m%s\x1b[0m', ` ${message}`);
  console.log(liner);
}


module.exports = {
  eLogger,
  rLogger,
  hLogger
};