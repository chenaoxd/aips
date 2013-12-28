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
                    alert(error.data);
                }
            );
        };
    }])
    .controller('ActInfoCtrl', ['$scope', 'ActivityService', '$routeParams',function($scope, ActSer, $routeParams) {
        $scope.act = ActSer.get();
        if(ActSer.act_id != $routeParams.act_id){
            $scope.act = ActSer.pull($routeParams.act_id);
            $scope.act.$promise.then(
                    function(data){
                    },
                    function(error){
                        alert(error.data);
                    }
                );
        }
        $scope.save_act = function(){
            $scope.act.$save();
        };
        $scope.sign_url = function(){
            return "/sign_act/";
        };
//        console.log($scope.act.name);
    }])
    .controller('SignActCtrl', ['$scope', 'ActivityService', '$routeParams', 'RegistrationService', function($scope, ActSer, $routeParams, RegSer){
        $scope.act = ActSer.get();
        $scope.formData = {};
        if(ActSer.act_id != $routeParams.act_id){
            $scope.act = ActSer.pull($routeParams.act_id);
            $scope.act.$promise.then(
                    function(data){
                    },
                    function(error){
                        alert(error.data);
                    }
                );
        }
        $scope.submit_sign = function(){
            $scope.reg = RegSer.init({'form_data':$scope.formData, 'act_id':$routeParams.act_id});
            console.log($scope.reg);
            RegSer.save();
        };
    }]);
