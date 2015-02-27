var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/words');

require(__dirname + '/models/word_model.js');

var app = express();

app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('port', process.env.PORT || 1337);

app.use(cookieParser());
app.use(bodyParser.json());

require(__dirname + '/rich_ui_routes')(app);

app.listen(app.get('port'), function(){
    console.log('Express is listening on port ' + app.get('port'));
});