var express = require('express');
module.exports = function(app) {
  var photos = require(__dirname + '/controllers/photos_controller');
  var comments = require(__dirname + '/controllers/comments_controller');
  var pages = require(__dirname + '/controllers/pages_controller');

  app.use('/static', express.static( __dirname + '/static'))
      .use('/images', express.static( __dirname + '/images'))
      .use('/lib', express.static( __dirname + '/lib'))
      .use('/bower_components', express.static( __dirname + '/bower_components'));

  app.get('/', function(req, res){
    res.render('photos');
  });

  app.get('/photos', photos.getPhotos);
  app.get('/photo', photos.getPhoto);
  app.get('/page', pages.getPage);
  //app.get('/comments/add', comments.addComment);
  app.post('/comments/add', comments.addComment);
  app.get('/comments/get', comments.getComment);
  app.post('/comments/post-test', function(req, res){
      console.log(req.body);
      res.json({msg: "hello"});
  })
};