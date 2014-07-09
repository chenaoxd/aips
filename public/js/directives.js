'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, el, attrs) {
            el.text(version);
        };
    }]).
    directive('dzRegForm', function(){
        return {
            restrict: 'E',
            scope: {
                form_list: '=sform',
                form_data: '=formData'
            },
            controller: function($scope){
                $scope.$watch($scope.form_data, function(){
                    console.log($scope.form_data);
                }, true);
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
            templateUrl: '/partials/form_edit.html'
        };
    }).
    directive('formUnit', function(){
        return {
            restrict: 'E',
            scope: {
                unit_info: '=unitInfo',
                form_data: '=formData',
                width: '=width'
            },
            controller: function($scope){
            },
            templateUrl: '/partials/form_unit.html'
        };
    }).
    directive('unitEdit', function(){
        return {
            restrict: 'E',
            scope: {
                unit_info: '=unitInfo'
            },
            controller: function($scope){
                $scope.unit_types = [{
                    'text': '文本填空',
                    'value': 'text'
                },{
                    'text': '单选',
                    'value': 'radio'
                }];
            },
            templateUrl: '/partials/unit_edit.html'
        };
    });
