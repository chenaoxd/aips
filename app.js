
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var db = require('./models/db');
var less_middleware = require('less-middleware');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(less_middleware({
    src: __dirname + "/public/app/less",
    dest: __dirname + "/public/app/css",
    compress: true
}));
app.use(express.static(path.join(__dirname, '/public/app')));
app.use(app.router);

db.init();

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.all('*', function(req, res, next){
    if(req.path.substring(0, 4) == '/api'){
        console.log('/api');
        next();
    }else{
        res.sendfile(__dirname + '/public/app/index.html');
    }
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
