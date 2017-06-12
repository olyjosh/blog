// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
  title: String,
  post: String
});

// the schema is useless so far
// we need to create a model using it
var blogBost = mongoose.model('blogBost', postSchema);

// make this available to our users in our Node applications
module.exports = blogBost;