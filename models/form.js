var mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
    actID: String,
    content: Object,
    state: Number
}, {
    collection: 'form'
});

var formModel = mongoose.model('Form', formSchema);

function Form(form) {
    this.actID = form.actID;
    this.content = form.content;
}

Form.prototype.save = function(callback) {
    var form = {
        actID: this.actID,
        content: this.content
    };
    var newForm = new formModel(form);
    newForm.save(function(err, form) {
        if(err) {
            return callback(err);
        }
        callback(null, form);
    });
};

Form.getListByAct = function(actID, callback) {
    formModel.find({actID: actID}, function(err, formList) {
        if(err){
            return callback(err);
        }
        callback(null, formList);
    });
};

module.exports = Form;
