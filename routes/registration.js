var RegForm = require('../models/registration.js');
var Activity = require('../models/activity.js');

function sub_form(req, res){
    var form_data = req.body.form_data;
    var act_id = req.params.act_id;
    var newForm = new RegForm({
        act_id: act_id,
        form_data: form_data,
        state: 'init'
    });
    newForm.save(function(err, form){
        if(err){
            req.flash('error', err);
            res.send('500');
        }
        res.send({
            reg_id: form._id,
            form_data: form.form_data,
            act_id: form.act_id,
            state: form.state
        });
    });
}

function get_registrations(req, res){
    Activity.get(req.params.act_id, function(err, act){
        if(!act){
            res.send('No activity: '+ req.params.act_id);
            console.log(req.body);
            return ;
        }
        RegForm.getListByAct(act._id, function(err, form_list){
            res.send(form_list);
        });
    });
}

exports.sub_form = sub_form;
exports.get_registrations = get_registrations;
