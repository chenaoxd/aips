var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var helper = require('../helper/basehelper.js');


var actSchema = new mongoose.Schema({
    name: String,
    securityKey: String,
    s_form: Schema.Types.Mixed,
    reg_start: String,
    reg_end: String,
    description: String
}, {
    collection: 'activity'
});

var actModel = mongoose.model('Activity', actSchema);
var keys = ['name', 'securityKey', 'reg_start', 'reg_end',
           'description', 's_form'];

function Activity(act) {
    for(var index in keys){
        this[keys[index]] = act[keys[index]] || '';
    }
    if(this.name == ''){
        this.name = 'default activity';
    }
    if(this.securityKey == ''){
        this.securityKey = crypto.randomBytes(8).toString('hex');
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
            {'label': 'name', 'display':'姓名', 'type': 'text', 'required': 1},
            {'label': 'phonenum', 'display':'手机号', 'type': 'text', 'required': 1}
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

Activity.check_security_key = function(id, req, res){
    actModel.findOne({_id: mongoose.Types.ObjectId(id)}, function(){
        if(err){
            return callback(err);
        }
        if(!act){
            res.status(404).send('');
        }
        callback(null, act);
    });
};

Activity.set_data = function(act, model){
    for(var index in keys){
        model[keys[index]] = act[keys[index]] || '';
    }
    model.securityKey = act.security_key;
    
};

Activity.prototype.response_format = function(){
    var response_body = {};
    for(var index in keys){
        response_body[keys[index]] = this[keys[index]];
    }
    response_body.security_key = this.securityKey || '';
    response_body.act_id = this._id;
    return response_body;
};

module.exports = Activity;
