'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    value('version', '0.1').
    service('ActivityService',['Activity', function(Activity) {
        console.log('act_service runing...');
        // Todo: when will the function body be called again. and neet to reconstruct
        var activity = new Activity();
        activity.name = 'default_name';
        return {
            'remove': function(){
                activity = new Activity();
                activity.name = 'default_name';
            },
            'pull': function(_id){
                return activity = Activity.get({act_id: _id});
            },
            'get': function(act_id){
                if(activity.act_id != act_id){
                    activity = new Activity();
                    activity = Activity.get({act_id: act_id});
                    activity.$promise.then(
                        function(data){
                        },
                        function(error){
                            console.log(error.data);
                        }
                    );
                }
                return activity;
            },
            'new': function(){
                return activity = new Activity();
            },
            'set_name': function(name){
                acvitiy.name = name;
            },
            'save': function(){
                return activity.$save();
            },
            'show': function(){
                console.log(activity);
            }
        };
    }]).
    service('RegistrationService', ['RegistrationForm', function(RegForm){
        var reg_form = new RegForm();
        return {
            'pull': function(act_id, reg_id){
                return reg_form = RegForm.get({act_id: act_id, reg_id: reg_id});
            },
            'get': function(act_id){
                if(reg_form.act_id != act_id){
                    reg_form = new RegForm();
                    reg_form.act_id = act_id;
                }
                return reg_form;
            },
            'new': function(){
                return reg_form = new RegForm();
            },
            'init': function(content){
                return reg_form = new RegForm(content);
            },
            'save': function(){
                return reg_form.$save();
            },
            'query': function(){
                return RegForm.query({act_id: reg_form.act_id});
            },
            'show': function(){
                console.log(reg_form);
            }
        };
    }]);;
