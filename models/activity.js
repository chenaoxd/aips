var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var helper = require('../helper/basehelper.js');


var actSchema = new mongoose.Schema({
    name: String,
    security_key: String,
    s_form: Schema.Types.Mixed,
    reg_start: String,
    reg_end: String,
    description: String
}, {
    collection: 'activity'
});

var actModel = mongoose.model('Activity', actSchema);
var keys = ['name', 'security_key', 'reg_start', 'reg_end',
           'description', 's_form'];

function Activity(act) {
    for(var index in keys){
        this[keys[index]] = act[keys[index]] || '';
    }
    if(this.name == ''){
        this.name = 'default activity';
    }
    if(this.security_key == ''){
        this.security_key = crypto.randomBytes(8).toString('hex');
    }
    if(act._id){
        this._id = act._id;
    }
    if('s_form' in act && act.s_form != ''){
        if(typeof(act.s_form) == 'string'){
            this.s_form = act.s_form.parseJSON();
        }else{
            this.s_form = act.s_form;
        }
    }else{
        this.s_form = [
            {'label': 'name', 'display':'姓名', 'type': 'text', 'required': 1, 'explanation': '请填写您的姓名。'},
            {'label': 'phonenum', 'display':'手机号', 'type': 'text', 'required': 1, 'explanation': '请填写您的手机号。'}
        ];
    }
};

Activity.prototype.update = function(act_id, callback){
    this._id = mongoose.Types.ObjectId(act_id);
    var updated_act = new actModel(this);
    updated_act.update(updated_act, {'_id': this._id},function(err, act){
        if(err){
            return callback(err);
        }
        callback(null, act);
    });
};

Activity.prototype.save = function(callback) {
    var newAct = new actModel(this);
    newAct.save(function(err, act) {
        if(err) {
            return callback(err);
        }
        callback(null, act);
    });
};

Activity.get = function(id, callback) {
    actModel.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, act){
        if(err){
            return callback(err);
        }
        callback(null, act);
    });
};

Activity.prototype.set_security_key = function(req){
    req.session[this._id] = this.security_key;
};

Activity.prototype.check_security_key = function(id, req){
    if(!(id in req.session) || ((id in req.session) && (req.session[id] != this.security_key))){
        return false;
    }
    return true;
};

Activity.set_data = function(act, model){
    for(var index in keys){
        model[keys[index]] = act[keys[index]] || '';
    }
    model.security_key = act.security_key;
    
};

Activity.prototype.response_format = function(req){
    var response_body = {};
    for(var index in keys){
        response_body[keys[index]] = this[keys[index]];
    }
    if(!this.check_security_key(this._id, req)){
        response_body.security_key = '';
    }
    response_body.act_id = this._id;
    return response_body;
};

module.exports = Activity;
