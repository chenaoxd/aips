var mongoose = require('mongoose');
var settings = require('../settings');

function init(){
    mongoose.connect('mongodb://'+settings.host+settings.db);
}

exports.init = init;
