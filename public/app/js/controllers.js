'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource']).
    controller('MyCtrl1', [function() {

    }])
    .controller('MyCtrl2', [function() {

    }])
    .controller('NewActCtrl',['$scope', 'ActivityService', '$location', function($scope, act_ser, $location) {
        act_ser.remove();
        $scope.new_act = act_ser.get();
        $scope.newAct = function(){
            act_ser.save().then(
                function(data){
//                    $location.url('/act_info');
                    $location.url('/act_info/'+$scope.new_act.act_id);
                },
                function(error){
                    alert(error.data)
                }
            );
        };
    }])
    .controller('ActInfoCtrl', ['$scope', 'ActivityService', function($scope, act_ser) {
        console.log('test');
        $scope.act = act_ser.get();
        if(act_ser.act_id != $routeParams.act_id){
            act_ser.init($routeParams.act_id);
        }
        console.log($scope.act.name);
    }]);
