var https = require('https');
var qs = require('querystring');
var url = require('url');

var prefix = 'https://sendcloud.sohu.com/webapi/mail.send.json?';

function get_params(){
}

function send_mail(mail_to, subject, content, callback){
    var params = {
        api_user: 'postmaster@wooqu.sendcloud.org',
        api_key: 'qIuygdzG',
        from: 'mail@wooqu.org',
        fromname: 'Wooqu网',
        to: mail_to,
        subject: subject,
        html: content
    };

    var req_body = qs.stringify(params);
    
    https.get(prefix + req_body, function(res){
        var _data = '';
        res.on('data', function(chunk){
            _data += chunk;
        });
        res.on('end', function(){
            callback(_data);
        });
    });
}

exports.send_mail = send_mail;
