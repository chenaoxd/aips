var Activity = require('../models/activity.js');
var Form = require('../models/form.js');
var settings = require('../settings');
var mongoose = require('mongoose');
var helper = require('../helper/basehelper.js');
var crypto = require('crypto');
var send_cloud = require('../helper/send_cloud.js');
var gcalendar = require('../helper/googlecalendar');

function main(req, res){
    res.render('index', {title: 'main'});
}

function newact(req, res){
    securityKey = crypto.randomBytes(8).toString('hex');
    var newAct = new Activity({
        name: req.body.name,
        securityKey: securityKey
    });
    newAct.save(function(err, act){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        act = new Activity(act);
        res.send(act.response_format());
    });
}

function save_info(req, res){
   Activity.get(req.params.id, function(err, act){
       if(!act){
           res.status(404).send('save_info');
       }
       Activity.set_data(req.body, act);
       act.save();
       console.log(act);
       act = new Activity(act);
       res.send(act.response_format());
   });
}

function get_act(req, res){
    Activity.get(req.params.id, function(err, act){
        if(!act){
            res.status(404).send('No such act');
        }
        act = new Activity(act);
        res.send(act.response_format());
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


//Todo: too old ,need to remove 
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

function send_mail_test(req, res){
    send_cloud.send_mail('chenao3220@gmail.com', 'test_callback', 'test_callback', function(_data){
        res.send(_data);
    });
}

function send_mail(req, res){
    Activity.get(req.params.act_id, function(err, act){
        if(!act){
            res.status(404).send('No such activity');
        }
        var html = '';
        html += '活动ID: ' + act._id + '<br/>';
        html += '活动标题: ' + act.name + '<br/>';
        html += '详细信息: <a href="' + settings.baseUrl + 'act_info/' + act._id + '">点击查看详细信息</a>';
        send_cloud.send_mail(req.body.email, act.name + ' 基本信息', html, function(_data){
            res.send(_data);
        });
    });
}

function send_info(req, res){
    Activity.get(req.params.act_id, function(err, act){
        if(!act){
            res.status(404).send('No such activity');
        }
        var html = '';
        html += '活动标题: ' + act.name + '<br/>';
        html += '活动介绍: ' + act.description;
        send_cloud.send_mail(req.body.email, act.name + ' 基本信息', html, function(_data){
            res.send(_data);
        });
    });
}

function add_gcalendar(req, res){
    gcalendar.add_gcalendar(req.body.access_token);
}

function testgca(req, res){
    require('../helper/googlecalendar.js');
}

exports.main = main;
exports.newact = newact;
exports.viewact = viewact;
exports.subform = subform;
exports.actinfo = actinfo;
exports.statistics = statistics;
exports.modform = modform;
exports.save_info = save_info;
exports.get_act = get_act;
exports.send_mail = send_mail;
exports.send_info = send_info;
exports.testgca = testgca;
exports.add_gcalendar = add_gcalendar;
