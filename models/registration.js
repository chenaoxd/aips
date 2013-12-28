var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regSchema = new mongoose.Schema({
    'act_id': Schema.Types.ObjectId,
    'form_data': Schema.Types.Mixed,
    'state': String
}, {
    collection: 'registration'
});

var regModel = mongoose.model('registration', regSchema);

function RegistrationForm(reg){
    this.act_id = mongoose.Types.ObjectId(reg.act_id);
    this.form_data = reg.form_data;
    this.state = reg.state;
}

RegistrationForm.prototype.save = function(callback){
    var reg = {
        act_id: this.act_id,
        form_data: this.form_data,
        state: this.state
    };
    var newReg = new regModel(reg);
    newReg.save(function(err, reg){
        if(err){
            return callback(err);
        }
        callback(null, reg);
    });
};

RegistrationForm.get = function(id, callback) {
    regModel.findOne({_id: mongoose.Types.ObjectId(id)}, function(err, reg){
        if(err){
            return callback(err);
        }
        callback(null, reg);
    });
};

module.exports = RegistrationForm;
