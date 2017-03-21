var express = require('express');
   var app = express(),
   http = require('http'),
   routes = require('./server/routes'),
   config = require('./server/configure'),
   words = require('./server/words'),
   app = config(app);

var url = require('url');
var  exphbs = require('express3-handlebars');
    
// holds path to the views folder
app.set('views', __dirname + '/views');


// defualt layout is the main folder
// layouts gets views and attatches layouts folder
// partial is in the views folder

app.engine('handlebars', exphbs.create({
       defaultLayout: 'main',
       layouts: app.get('views') + '/layouts' ,
       partialsDir: app.get('views')
     }).engine);

// setting the handlebars
app.set('view engine','handlebars');
app.set('port1', process.env.PORT || 3308);


app.get('/', function(req, res){
    //res.send("Server send");
    //res.end(JSON.stringify(routes.YesterdaysWord()));
      res.status(404);
      res.render('404');

   });

app.get('/YesterdaysWord', function(request,response){ 
    response.setHeader('content-type', 'text/html');
     var word = routes.YesterdaysWord();
     // data is sent into the handle bar in view via word object
     response.render('home',word);

   });


app.get('/TodaysWord',function(request,response){ 
    response.setHeader('content-type', 'text/html');
    var word = routes.TodaysWord();
    console.log(typeof(word));
    response.render('home',word);
  }
);

app.get('/Date/:getParam',function(request,response){ 
    var get_params = url.parse(request.url, true).query;
    if (Object.keys(get_params).length == 0)
         {
    response.setHeader('content-type', 'text/html');
    var date =routes.date(request.params.getParam);
    console.log(typeof(date));
    response.render('home',date);  
      }
  });



app.get('/Word/:getParam',function(request,response){ 
    var get_params = url.parse(request.url, true).query;
    if (Object.keys(get_params).length !== 0)
         {
        response.setHeader('content-type', 'application/json');
        var word =routes.word(request.params.getParam);
        console.log(TypeOf(word));
        response.render('404')
        //response.render('word',words);
      }
  }
);

app.use(function(req,res,next){
  res.status(404);
  res.render('404');
});


   app.listen(app.get('port1'), function() {
           console.log('Server up: http://localhost:' + app.get('port1'));
       });