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
    .controller('ActInfoCtrl', ['$scope', 'ActivityService', '$routeParams', 'dz_host', '$http', function($scope, ActSer, $routeParams, dz_host, $http) {
        $scope.mail_to = '';
        $scope.dz_host = dz_host;
        $scope.act = ActSer.get($routeParams.act_id);
        $scope.save_act = function(){
            $scope.act.$save();
        };
        $scope.sign_url = function(){
            return "/sign_act/";
        };
        $scope.send_mail = function(){
            $http.post('/api/activity/' + $scope.act.act_id + '/send_base', {'email': $scope.mail_to}).
                success(function(data, status, headers, config){
                    if(data.message == 'success'){
                        alert('发送成功');
                    }
                }).
                error(function(data, status, headers, config){
                    alert(data);
                });
        };
        //        console.log($scope.act.name);
    }])
    .controller('SignActCtrl', ['$scope', 'ActivityService', '$routeParams', 'RegistrationService', function($scope, ActSer, $routeParams, RegSer){
        $scope.act = ActSer.get($routeParams.act_id);
        $scope.form_data = {};
        $scope.submit_sign = function(){
            $scope.reg = RegSer.init({'form_data':$scope.form_data, 'act_id':$routeParams.act_id});
            RegSer.save();
        };
    }])
    .controller('RegInfoCtrl', ['$scope', 'ActivityService', 'RegistrationService', '$routeParams', function($scope, ActSer, RegSer, $routeParams){
        $scope.act = ActSer.get($routeParams.act_id);
        RegSer.init({act_id: $routeParams.act_id});
        $scope.reg_list = RegSer.query();
    }])
    .controller('ModRegCtrl', ['$scope', 'ActivityService', '$routeParams', function($scope, ActSer, $routeParams){
        $scope.act = ActSer.get($routeParams.act_id);
        //        console.log('ModRegCtrl');
        $scope.form_data = {};
        $scope.save_form = function(){
            $scope.act.$save();
        };
        $scope.check_list = function(form_list){
            var check_list = [];
            for(var index in form_list){
                if(form_list[index]['label'] in check_list){
                    return false;
                }
                check_list.push(form_list[index]['label']);
            }
            return true;
        };
    }]);
