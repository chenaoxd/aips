var https = require('https');
var qs = require('querystring');

var host_url = "www.googleapis.com";

var post_data={
    "end": {
        "dateTime": "2014-01-13T12:00:00Z"
    },
    "start": {
        "dateTime": "2014-01-01T15:00:00Z"
    },
    "reminders": {
        "useDefault": false,
        "overrides": [
            {
                "method": "sms",
                "minutes": 10
            }
        ]
    },
    "summary": 'asssssss from aips'
};
var content = qs.stringify(post_data);

function add_gcalendar(access_token){
    var options = {
        host: host_url,
        //    port: 80,
        path: '/calendar/v3/calendars/chenao3220%40gmail.com/events?key=' + 'AIzaSyCxuJ5iM0Zit6kyZxv4K8cqAMOry1ymtJQ',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length,
            'Authorization': 'Bearer ' + access_token
        }
    };
    
    var req = https.request(options, function(res){
        var _data = '';
        res.on('data', function(chunk){
            _data += chunk;
        });
        res.on('end', function(){
            console.log(_data);
        });
    });
    req.write(content);
    req.end();
}


exports.add_gcalendar = add_gcalendar;
