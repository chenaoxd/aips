var RegForm = require('../models/registration.js');

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

exports.sub_form = sub_form;
