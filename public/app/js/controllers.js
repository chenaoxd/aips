'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource']).
    controller('MyCtrl1', [function() {

    }])
    .controller('MyCtrl2', [function() {

    }])
    .controller('NewActCtrl',['$scope','$resource', function($scope, $resource) {
        $scope.act_name="test";
        $scope.newAct = function(){
            var Act = resource('/api/activity');
        };
    }]);
