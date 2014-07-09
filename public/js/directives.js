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
                unit_value: '=unitValue',
                width: '=width'
            },
            controller: function($scope){
                console.log($scope);
            },
            templateUrl: '/partials/form_unit.html'
        };
    });
