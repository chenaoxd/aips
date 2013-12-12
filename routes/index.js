activity = require('./activity');
settings = require('../settings.js');

module.exports = function(app){
    app.get('/main', activity.main);
    app.get('/test', function(req, res) {
        res.render('index', {title: 'test'});
    });
    app.post('/api/activity', activity.newact);
    app.get('/viewact/:id', activity.viewact);
    app.post('/subform/:id', activity.subform);
    app.get('/actinfo/:id', activity.actinfo);
    app.get('/statistics/:id', activity.statistics);
    app.get('/modform/:id', activity.modform);
};
