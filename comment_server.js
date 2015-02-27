var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://localhost/comments');

require(__dirname + '/models/comments_model.js');
require(__dirname + '/models/photo_model.js');
require(__dirname + '/models/page_model.js');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('port', process.env.PORT || 1337);
app.use(jsonParser);
app.use(cookieParser());

require(__dirname + '/comment_routes')(app);

app.listen(app.get('port'), function(){
    console.log(("Express server listening on port " + app.get('port')))
});