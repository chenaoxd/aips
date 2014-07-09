'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
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
        $routeProvider.when('/googleoauth/callback', {templateUrl: '/partials/googleoauth.html', controller: 'GoogleOauthCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
        
    }]).
    factory('Activity', ['$resource','api_prefix', function($resource, api_prefix){
        return $resource(api_prefix + '/activity/:act_id',
                         {act_id: '@act_id'});
    }]).
    factory('RegistrationForm', ['$resource', 'api_prefix', function($resource, api_prefix){
        return $resource(api_prefix + '/registration/:act_id/:reg_id',
                         {'act_id': '@act_id', 'reg_id': '@reg_id'});
    }]);
