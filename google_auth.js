var express = require('express'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
require(__dirname + '/models/user_model.js');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/sampleapp');

User = mongoose.model('User');

app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('port', process.env.PORT || 1337);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: "607346636032039",
        clientSecret: "787d3d38cfb6796c017049dfaecf28e2",
        callbackURL: 'http://localhost:' + app.get('port') + '/auth/facebook/return'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ facebookId: profile.id  })
            .exec(function(err, user) {
                console.log(profile);
                if(!user){
                    user = new User({
                        username: profile.username,
                        facebookId: profile.id
                    });

                    user.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                }
                if (err) { return done(err); }
                done(null, user);
            });
    }
));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(__dirname + '/static'));
app.use('/views',express.static(__dirname + '/views'));

app.get('/login', function(req, res){
  if(req.isAuthenticated()){
    res.redirect('/info');
  } else{
    res.render('login', { user: req.user });
  }
});

app.get('/auth/google',
  passport.authenticate('google'));

app.get('/auth/google/return',
  passport.authenticate('google', {
    successRedirect: '/info',
    failureRedirect: '/login' }));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/return',
    passport.authenticate('facebook', {
        successRedirect: '/info',
        failureRedirect: '/login' }));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

app.get('/info', function(req, res){
  if(req.isAuthenticated()){
    console.log(req.user);
    res.render('info', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

app.listen(app.get('port'), function(){
    console.log(("Express server listening on port " + app.get('port')))
});