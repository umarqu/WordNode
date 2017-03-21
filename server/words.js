var fs = require('fs');


function read_json_file(){
  var file = 'TodaysWon';
return fs.readFileSync(file);}

exports.list = function(){
  return JSON.parse(read_json_file());
};
