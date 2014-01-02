activity = require('./activity');
registration = require('./registration');
settings = require('../settings.js');

module.exports = function(app){
//    app.get('/main', activity.main);
    app.post('/api/activity', activity.newact);
    app.get('/api/activity/:id', activity.get_act);
    app.post('/api/activity/:id', activity.save_info);
    app.post('/api/registration/:act_id', registration.sub_form);
    app.get('/api/registration/:act_id', registration.get_registrations);
//    app.get('/api/test/email', activity.send_mail);
    app.post('/api/activity/:act_id/send_base', activity.send_mail);
//    app.get('/viewact/:id', activity.viewact);
//    app.post('/subform/:id', activity.subform);
//    app.get('/actinfo/:id', activity.actinfo);
//    app.get('/statistics/:id', activity.statistics);
//    app.get('/modform/:id', activity.modform);
};
