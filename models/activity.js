var crypto = require('crypto');
var mongoose = require('mongoose');

var actSchema = new mongoose.Schema({
    name: String,
    securityKey: String,
    s_form: Object
}, {
    collection: 'activity'
});

var actModel = mongoose.model('Activity', actSchema);

function Activity(act) {
    this.name = act.name;
    this.securityKey = act.securityKey;
    if('s_form' in act){
        console.log('s_form in ....');
        this.s_form = act.s_form.parseJSON();
    }else{
        this.s_form = {'name':1, 'phone':1};
    }
};

Activity.prototype.save = function(callback) {
    var act = {
        name: this.name,
        securityKey: this.securityKey,
        s_form: this.s_form
    };
    var newAct = new actModel(act);
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

module.exports = Activity;
