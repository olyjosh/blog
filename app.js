var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/green');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); 
app.use('/users', users);


app.post('/api/reg', function (req, res) {
    var respon={status:0};

    var email = req.body.email;
    var first = req.body.firstName;
    var last = req.body.lastName;
    var pass = req.body.password;
    var phone = req.body.phone;
    var User = require('./model/user');
// create a new user called chris
    var chris = new User({
        firstName: first,
        lastName: last,
        email: email,
        phone: phone,
        password: pass

    });
// call the built-in save method to save to the database
    chris.save(function (err) {
        if (err){
            throw err;
        }

        console.log('User saved successfully!');
        respon={status:1};
        res.send(JSON.stringify(respon));
    });
    
});

app.post('/api/post', function (req, res) {
    var respon={status:0};
    //var email = "olyjoshone@gmail.com";

    var Post = require('./model/post');
    var postVar = new Post({
        email: "olyjoshone@gmail.com",
        product: req.body.product,
        type: req.body.type,
        location: req.body.location,
        description: req.body.description,
        price: req.body.price,
        negotiable: req.body.negotiable

    });
    
// call the built-in save method to save to the database
    postVar.save(function (err,post) {
        if (err){
            //throw err;
        }

        console.log('Post saved successfully!');
        respon={status:1, post_id:post._id};
        res.send(JSON.stringify(respon));
    });
    
});



//The blog posting code starts here
app.post('/api/createBlogPost', function (req, res) {
    var respon={status:0};
    
    var title = req.body.title;
    var pos = req.body.post;
    var Post = require('./model/blogPost');
    var postVar = new Post({
        title: title,
        post: pos
    });
    
    postVar.save(function (err,post) {
        if (err){
            //throw err;
        }
        
        respon={status:1, post:post};
        console.log(post);
        res.send(JSON.stringify(respon));
    });
    
    
});

// read blog post here soon


app.post('/api/deleteBlogPost', function (req, res) {
    var respon={status:0};
    var postid = req.body.id;
    var Post = require('./model/blogPost');
    
    Post.find({ id:postid }).remove( function(err){
        if (err)
                throw err
        console.log('DELETED');
        respon={status:1};
        res.send(JSON.stringify(respon));
    })
    
});

app.post('/api/editBlogPost', function (req, res) {
    var respon = {status: 0};
    var Post = require('./model/blogPost');
// call the built-in save method to save to the database
    console.log(req.body)
    var Post = require('./model/blogPost');
    var postVar = new Post({
        title: req.body.title,
        status: req.body.post
    });

    var upsertData = postVar.toObject();
// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
    delete upsertData._id;
    Post.update({_id: postVar.id}, upsertData, {upsert: true}, function(err){
        if (err)
                throw err
            //return res.send(500, {error: err});
        respon = {status: 1, posts: doc};
        res.send(JSON.stringify(respon));
    });


});

app.post('/api/readBlogPost', function (req, res) {
    var respon = {status: 0};
    var postVar = require('./model/blogPost');
    postVar.find({}, function (err, posts) {
        if (err){
            throw err;
    }
        respon = {status: 1, posts: posts};
        res.send(JSON.stringify(respon));
    });



});

app.get('/api/login', function (req, res) {
    var email = req.body.email;
    var first = req.body.firstName;
    
    res.send(req.body);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
