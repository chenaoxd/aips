var RegForm = require('../models/registration.js');
var Activity = require('../models/activity.js');
var csv = require('express-csv');

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

function get_registrations_csv(req, res){
    Activity.get(req.params.act_id, function(err, act){
        if(!act){
            res.send('No activity: '+ req.params.act_id);
            console.log(req.body);
            return ;
        }
        RegForm.getListByAct(act._id, function(err, form_list){
            form_info = act.s_form;
            var csv_data = [];
            var header = [];
            for(var index in form_info){
                header.push(form_info[index].display);
            }
            csv_data.push(header);
            for(var reg_index in form_list){
                var line = [];
                for(index in form_info){
                    line.push(form_list[reg_index].form_data[form_info[index].label]);
                }
                csv_data.push(line);
            }
            var http_header = {
                "Content-Disposition": "attachment",
                "filename": act.name + '报名信息'
            };
            res.setHeader('Content-disposition', 'attachment; filename=' + act.name + '报名信息.csv');
            res.csv(csv_data,http_header);
        });
    });
}

exports.sub_form = sub_form;
exports.get_registrations = get_registrations;
exports.get_registrations_csv = get_registrations_csv;

