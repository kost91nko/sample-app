var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/sampleapp');
require(__dirname + '/models/user_model.js');


var app = express();

app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('SECRET'));

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        // Basic usage
        mongooseConnection: mongoose.connection,
        collection: 'sessions',
        maxAge: 300000
    })
}));

require(__dirname + '/routes')(app);

app.listen(888);