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
    .controller('SignActCtrl', ['$scope', 'ActivityService', '$routeParams', 'RegistrationService', '$http', function($scope, ActSer, $routeParams, RegSer, $http){
        $scope.sendmail = 'false';
        $scope.act = ActSer.get($routeParams.act_id);
        $scope.form_data = {};
        $scope.submit_sign = function(){
            if($scope.sendmail == true){
                $http.post('/api/activity/' + $scope.act.act_id + '/send_info', {'email': $scope.mail_to}).
                    success(function(data, status, headers, config){
                        if(data.message == 'success'){
                            alert('发送成功');
                        }
                    }).
                    error(function(data, status, headers, config){
                        alert(data);
                    });
            }
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
            if(check_list($scope.act.s_form)){
                $scope.act.$save();
            }else{
                alert('不能有重名label');
            }
        };
        var check_list = function(form_list){
            var check_list = [];
            for(var index in form_list){
                if($.inArray(form_list[index]['label'], check_list) >= 0){
                    return false;
                }
                check_list.push(form_list[index]['label']);
            }
            return true;
        };
    }]);
