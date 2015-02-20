var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://localhost/comments');

require('./models/comments_model.js');
require('./models/photo_model.js');
require('./models/page_model.js');

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('port', process.env.PORT || 1337);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

require('./comment_routes')(app);

app.listen(app.get('port'), function(){
    console.log(("Express server listening on port " + app.get('port')))
});