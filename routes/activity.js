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
            res.status(404).send(helper.only_error(-1, 'No such act'));
            return;
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
            res.status(404).send(helper.only_error(-1, 'No such act'));
            return;
        }
        act = new Activity(act);
        console.log(act.check_security_key(req.params.id, req));
        req.session[act._id] = act.security_key;
        res.send(act.response_format());
    });
}

function send_mail(req, res){
    Activity.get(req.params.act_id, function(err, act){
        if(!act){
            res.status(404).send(helper.only_error(-1, 'No such act'));
            return;
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
            res.status(404).send(helper.only_error(-1, 'No such act'));
            return;
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

exports.main = main;
exports.newact = newact;
exports.save_info = save_info;
exports.get_act = get_act;
exports.send_mail = send_mail;
exports.send_info = send_info;
exports.add_gcalendar = add_gcalendar;
