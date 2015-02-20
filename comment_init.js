var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/comments');

require('./models/comments_model.js');
require('./models/photo_model.js');
require('./models/page_model.js');

var CommentThread = mongoose.model('CommentThread');

var Reply = mongoose.model('Reply');
var Photo = mongoose.model('Photo');
var Page = mongoose.model('Page');

function addPhoto(title, filename){
  var comment = new CommentThread({title: title +" Comments"});
  comment.save(function(err, comment){
    var photo = new Photo({title:title, filename:filename});
    photo.commentId = comment.id;
    photo.save(function(){
      console.log(title + " Saved.");
    });
  });
}

CommentThread.remove().exec(function(){
  Photo.remove().exec(function(){
    Page.remove().exec(function(){
      var comment = new CommentThread({title:"Photo Page Comments"});
      comment.save(function(err, comment){
        var page = new Page({name:"Photos Page"});
        page.commentId = comment.id;
        page.save();
      });
      addPhoto('Strength',   '1559333.jpg');
      addPhoto('Power',      '1559479.jpg');
      addPhoto('Beauty',     '1559704.jpg');
      addPhoto('Thoughtful', '1560264.jpg');
      addPhoto('Summer Fun', '1560994.jpg');
    });
  });
});