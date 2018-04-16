var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    
server.listen(3000);


global.__basedir = __dirname;

var configDb = require('./config/database')

mongoose.connect(configDb.url);
mongoose.Promise = Promise;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret : 'anything',
         saveUninitialized : true,
         resave : true })
);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./config/passport.js')(passport);
require('./routes/auth')(app, passport);
require('./routes/users')(app, passport);
require('./config/chat')(app, io);
require('./config/cron')(app,io);

app.use(function(req, res, next) {
  var err = new Error('Page not found');
  err.status = 404;
  next(err);
});
  
app.use(function(err, req, res, next) {
  res.message = err.message;
  res.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  console.log(res.message);
  res.render('error' , {error : res.error});
});

// module.exports = app;