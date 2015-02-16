var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var mongoStore = require('connect-mongo')(express);

require(__dirname + '/models/user_model.js');

var app = express();

app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended: true}));

