
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var db = require('./models/db');
var session = require('express-session');
var settings = require('./settings');

var app = express();

// all environments
app.use(session({secret: settings.session_secret, resave: true, saveUninitialized: true}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

db.init();


app.get('/',function(req, res){
    res.render("index");
});
app.get('/partials/:name',function(req, res){
    res.sendfile(__dirname + '/views/partials/' + req.params.name);
});
routes(app);
app.get('*',function(req, res){
    res.render("index");
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
