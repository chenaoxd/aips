'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]).
    constant('api_prefix','/api').
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {       
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix = '!';

        $routeProvider.when('/view1', {templateUrl: '/partials/partial1.html', controller: 'MyCtrl1'});
        $routeProvider.when('/view2', {templateUrl: '/partials/partial2.html', controller: 'MyCtrl2'});
        $routeProvider.when('/', {templateUrl:'/partials/newact.html', controller:'NewActCtrl'});
        $routeProvider.when('/act_info/:act_id', {templateUrl: '/partials/act_info.html', controller: 'ActInfoCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
        
    }]).
    factory('Activity', ['$resource','api_prefix', function($resource, api_prefix){
        return $resource(api_prefix + '/activity/:act_id',
                         {act_id: '@act_id'});
    }]).
    service('ActivityService',['Activity', function(Activity) {
        console.log('act_service runing...');
        // Todo: when will the function body be called again.
        var activity = new Activity();
        activity.name = 'default_name';
        return {
            'remove': function(){
                activity = new Activity();
                activity.name = 'default_name';
            },
            'init': function(_id){
                activity = Activity.get({act_id: _id});
            },
            'get': function(){
                return activity;
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
        }
    }]);

