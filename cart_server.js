var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var db = mongoose.connect('mongodb://localhost/cart');

require(__dirname + '/models/cart_model.js');
var app = express();

app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('port', process.env.PORT || 1337);
app.use(cookieParser());
app.use(bodyParser.json());
require(__dirname + '/cart_routes')(app);

app.listen(app.get('port'), function(){
    console.log(("Express server listening on port " + app.get('port')))
});