var express = require('express');
module.exports = function(app) {
  var weather = require(__dirname + '/controllers/weather_controller');
  var words = require(__dirname + '/controllers/words_controller');
  app.use('/static', express.static( __dirname + '/static')).
      use('/images', express.static( __dirname + '/images')).
      use('/lib', express.static( __dirname + '/lib')).
      use('/bower_components', express.static( __dirname + '/bower_components')
  );

  app.get('/', function(req, res){
    res.render('rich_ui');
  });

  app.get('/weather', weather.getWeather);
  app.get('/words', words.getWords);
};