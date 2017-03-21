var fs = require('fs');
var path = require('path');

function read_json_file() {
	  var absolutePath =process.cwd();
	  var pathToFile = absolutePath + '/server/vocab/';
      return pathToFile;
}

function sliceStr(str){
	str = str.substring(1, str.length - 1);
	return str
}

function getWord(JsonData){
	var jsonParse= JSON.parse(fs.readFileSync(JsonData,'utf8'));
  var word = JSON.stringify(jsonParse.word);
	word = sliceStr(word);
    return word;
   }  

function getSyllables(JsonData){
	var jsonParse= JSON.parse(fs.readFileSync(JsonData,'utf8'));
  var syllables = JSON.stringify(jsonParse.syllables); // syllables is the object to get
	syllables = sliceStr(syllables);
    return syllables;
   } 

function getDefinition(JsonData){
	var arr = [];
	var Temp = "";
	var jsonParse= JSON.parse(fs.readFileSync(JsonData,'utf8'));
    
    var Definition1 = jsonParse.Definition1;
    Definition1 = JSON.stringify(Definition1);// Definition is the object to get
    Definition1 = sliceStr(Definition1);
    arr.push(Definition1);
    

    if (jsonParse.Definition2  !=undefined){
    	Temp = JSON.stringify(jsonParse.Definition2);
    	Temp = sliceStr(Temp);
    	arr.push(Temp);
    	
    }
    if (jsonParse.Definition3 !=undefined){
    	Temp = JSON.stringify(jsonParse.Definition3);
    	Temp = sliceStr(Temp);s
    	//console.log("temp"+Temp);
    	arr.push(Temp);
    	
    }

    if (jsonParse.Definition4 !=undefined){
    	Temp = JSON.stringify(jsonParse.Definition4);
    	Temp = sliceStr(Temp);
    	//console.log("temp"+Temp);
    	arr.push(Temp);
    	
    }
    return arr;
   }  

function getExample(JsonData){
	var ExamplesArray = [];
	var Temp = "";
	var jsonParse= JSON.parse(fs.readFileSync(JsonData,'utf8'));
    var Example1 = jsonParse.example1;
    Example1= JSON.stringify(Example1);
 	Example1 = sliceStr(Example1);
    ExamplesArray.push(Example1);

    if (jsonParse.example2  !=undefined){
    	Temp = JSON.stringify(jsonParse.example2);
    	Temp = sliceStr(Temp);
    	ExamplesArray.push(Temp);
    }
    if (jsonParse.example3 !=undefined){
    	Temp = JSON.stringify(jsonParse.example3);
    	Temp = sliceStr(Temp);
    	ExamplesArray.push(Temp);
    }

    if (jsonParse.example4 !=undefined){
    	Temp = JSON.stringify(jsonParse.example4);
    	Temp = sliceStr(Temp);
    	ExamplesArray.push(Temp);
    }
  
    return ExamplesArray;
   }  


function returnPath(WordDay){
	var Stringed = 'Word.json';
 	var absolutePath = read_json_file();
 	var jsFile = WordDay+Stringed;
 	var jsFilePath = absolutePath+jsFile;
	return jsFilePath
}

exports.Word = function(WordDay) {
	var jsFilePath = returnPath(WordDay);
}
exports.Syllables = function(WordDay) {
 	var jsFilePath = returnPath(WordDay);
}

exports.Definition1 = function(WordDay) {
 	jsFilePath = returnPath(WordDay);
}

exports.Definition2 = function(WordDay) {
 	jsFilePath = returnPath(WordDay);
}

exports.Example1 = function() {
 	var todaysString = 'TodaysWord.json';
 	var absolutePath = read_json_file();
 	todaysString = absolutePath+todaysString;
 	return getExample1(todaysString);
}

exports.Example2 = function() {
 	var todaysString = 'TodaysWord.json';
 	var absolutePath = read_json_file();
 	todaysString = absolutePath+todaysString;
 	return getExample2(todaysString);
}

createJs = function(word,Syllable,Definition,Example){
	
	var js = {
		"words":word,
		"Syllables":Syllable,
		"Definitions":Definition,
		"Examples":Example
	}
	return js
};

 exports.TodaysWord = function() {
 	var todaysString = 'TodaysWord.json';
 	var absolutePath = read_json_file();
	todaysString = absolutePath+todaysString;
 	// above gets the full url of todays url

 	// gets the word for todays word
    var word = getWord(todaysString);
 
    // gets the syllables 
    var Syllables = getSyllables(todaysString);
    // gets the definition 
    var Definition= getDefinition(todaysString);
    //var Definition2 = JSON.stringify(routes.Definition(todaysString));
    //var arr = {words : word}
    var Example= getExample(todaysString);

    var jsObj = createJs(word,Syllables,Definition,Example)
    return jsObj;
}

 exports.YesterdaysWord = function() {
 	var yesterdaysString = 'YesterdaysWord.json';
 	var absolutePath = read_json_file();
 	yesterdaysString = absolutePath+yesterdaysString;

 	var word = getWord(yesterdaysString);
 	var Syllables = getSyllables(yesterdaysString);
  var Example= getExample(yesterdaysString);
  var Definition= getDefinition(yesterdaysString);

  var jsObj = createJs(word,Syllables,Definition,Example)
    return jsObj;
}

 exports.date = function(file){
  var datefile = 'Dates/'+file +'.json'
  var absolutePath = read_json_file();
  var pathString = absolutePath+datefile;

  var word = getWord(pathString);
  var Syllables = getSyllables(pathString);
  var Example= getExample(pathString);
  var Definition= getDefinition(pathString);
  var jsObj = createJs(word,Syllables,Definition,Example);

  return jsObj;
  }
   

 exports.query = function(number) {
      var json_result = JSON.parse(read_json_file());
      var result = json_result.result;
      for (var i = 0; i < result.length; i++) {
         var contact = result[i];
         if (contact.primarycontactnumber == number)    {
            return contact;
         }
} return null;
   }         


  exports.list_groups = function() {
  var json_result = JSON.parse(read_json_file());
   var result = json_result.result;
   var resultArray = new Array ();
   for (var i = 0; i < result.length; i++) {
      var groups = result[i].groups;
      for (var index = 0; index < groups.length; index++) {
         if (resultArray.indexOf(groups[index]) == -1) {
            resultArray.push(groups[index]);
         }}
   return resultArray;
  }
}

exports.get_members = function(group_name) {
   var json_result = JSON.parse(read_json_file());
   var result = json_result.result;
   var resultArray = new Array ();
   for (var i = 0; i < result.length; i++) {
      if (result[i].groups.indexOf(group_name) > -1) {
         resultArray.push(result[i]);
      }
}
   return resultArray;
}  