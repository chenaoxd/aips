var Activity = require('../models/activity.js');
var Form = require('../models/form.js');
var settings = require('../settings');
var mongoose = require('mongoose');
var helper = require('../helper/basehelper.js');
var crypto = require('crypto');

function main(req, res){
    res.render('index', {title: 'main'});
}

function newact(req, res){
    securityKey = crypto.randomBytes(8).toString('hex');
    var newAct = new Activity({
        name: req.body.act_name,
        securityKey: securityKey
    });
    newAct.save(function(err, act){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        res.send({
            'error': helper.error(1, 'Create success'),
            'security_key': act.securityKey,
            'activity_id': act._id
        });
    });
}

function viewact(req, res){
    Activity.get(req.params.id, function(err, act){
        if(!act){
            res.send('No such activity:' + req.params.id);
            console.log(req.body);
            return;
        }
        var context = {
            act_name: act.name,
            act_id: act._id,
            title: act.name,
            form_info: act.s_form
        };
        res.render('actcontent',context);
    });
}

function subform(req, res){
    var content = req.body;
    var actID = req.params.id;
    var newForm = new Form({
        actID: actID,
        content: content
    });
    newForm.save(function(err, form) {
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        res.send(form._id);
    });
}

function actinfo(req, res){
    Activity.get(req.params.id, function(err, act){
        if(!act){
            res.send('No such activity:' + req.params.id);
            console.log(req.body);
            return;
        }
        var context = {
            act_id: act._id,
            act_name: act.name,
            sign_url: settings.baseUrl + 'viewact/' + act._id,
            statistics_url: settings.baseUrl + 'statistics/' + act._id,
            form_url: settings.baseUrl + 'modform/' + act._id,
            title: act.name
        };
        res.render('actinfo', context);
    });
}

function statistics(req, res){
    Activity.get(req.params.id, function(err, act){
        if(!act){
            res.send('No Activity:' + req.params.id);
            console.log(req.body);
            return;
        }
        Form.getListByAct(act._id, function(err, formList){
            
            console.log(formList);
            console.log(act);
            var context = {
                title: act.name,
                s_form: act.s_form,
                e_form_list: formList
            };
            res.render("statistics",context);
        });
    });
}

function modform(req, res){
    Activity.get(req.params.id, function(err, act){
        if(!act){
            res.send('No such activity' + req.params.id);
            console.log(req.body);
            return;
        }
        var context = {
            act_name: act.name,
            title: act.name,
            s_form: JSON.stringify(act.s_form)
        };
        res.render('modform',context);
    });
}

exports.main = main;
exports.newact = newact;
exports.viewact = viewact;
exports.subform = subform;
exports.actinfo = actinfo;
exports.statistics = statistics;
exports.modform = modform;
