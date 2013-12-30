'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]).
    constant('api_prefix', '/api').
    constant('dz_host', 'http://aips.wooqu.org').
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {       
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix = '';

        $routeProvider.when('/view1', {templateUrl: '/partials/partial1.html', controller: 'MyCtrl1'});
        $routeProvider.when('/view2', {templateUrl: '/partials/partial2.html', controller: 'MyCtrl2'});
        $routeProvider.when('/', {templateUrl:'/partials/newact.html', controller:'NewActCtrl'});
        $routeProvider.when('/act_info/:act_id', {templateUrl: '/partials/act_info.html', controller: 'ActInfoCtrl'});
        $routeProvider.when('/sign_act/:act_id', {templateUrl: '/partials/sign_act.html', controller: 'SignActCtrl'});
        $routeProvider.when('/sign_info/:act_id', {templateUrl: '/partials/reg_info.html', controller: 'RegInfoCtrl'});
        $routeProvider.when('/mod_reg/:act_id', {templateUrl: '/partials/mod_reg.html', controller: 'ModRegCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
        
    }]).
    factory('Activity', ['$resource','api_prefix', function($resource, api_prefix){
        return $resource(api_prefix + '/activity/:act_id',
                         {act_id: '@act_id'});
    }]).
    factory('RegistrationForm', ['$resource', 'api_prefix', function($resource, api_prefix){
        return $resource(api_prefix + '/registration/:act_id/:reg_id',
                         {'act_id': '@act_id', 'reg_id': '@reg_id'});
    }]).
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
    }]).
    directive('dzRegForm', function(){
        return {
            restrict: 'E',
            scope: {
                form_list: '=sform',
                form_data: '=formData'
            },
            templateUrl: '/partials/form_dir.html'
        };
    }).
    directive('dzRegEdit', function(){
        return {
            restrict: 'E',
            scope: {
                form_list: '=sform'
            },
            controller: function($scope){
                $scope.list_remove = function(index){
                    $scope.form_list.splice(index, 1);
                };
                $scope.list_add = function(){
                    $scope.form_list.push({type: 'text', label: 'label', required: '1', display: 'display'});
                };
            },
            templateUrl: 'partials/form_edit.html'
        };
    });
