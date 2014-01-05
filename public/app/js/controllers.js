'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource']).
    controller('MyCtrl1', ['$scope',function($scope) {
        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];
        $scope.closeAlert = function(index){
            console.log(index);
        };
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
                    }else{
                        alert('发送邮件失败： ' + JSON.stringify(data.errors));
                    }
                }).
                error(function(data, status, headers, config){
                    alert(data);
                });
        };
        //        console.log($scope.act.name);
    }])
    .controller('SignActCtrl', ['$scope', 'ActivityService', '$routeParams', 'RegistrationService', '$http', '$cookieStore', '$location',function($scope, ActSer, $routeParams, RegSer, $http, $cookiestore, $location){
        $scope.sendmail = 'false';
        $scope.act = ActSer.get($routeParams.act_id);
        $scope.form_data = {};
        $cookiestore.put('back_to_url', $location.url());
        $scope.submit_sign = function(){
            if($scope.sendmail == true){
                $http.post('/api/activity/' + $scope.act.act_id + '/send_info', {'email': $scope.mail_to}).
                    success(function(data, status, headers, config){
                        if(data.message == 'success'){
                            alert('发送成功');
                        }else{
                            alert('发送邮件失败: ' + JSON.stringify(data.errors));
                        }
                    }).
                    error(function(data, status, headers, config){
                        alert(data);
                    });
            }
            $scope.reg = RegSer.init({'form_data':$scope.form_data, 'act_id':$routeParams.act_id});
            RegSer.save();
            alert('报名成功');
        };
    }])
    .controller('RegInfoCtrl', ['$scope', 'ActivityService', 'RegistrationService', '$routeParams', '$cookieStore', '$location', function($scope, ActSer, RegSer, $routeParams, $cookiestore, $location){
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
                alert('修改报名表成功');
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
    }])
    .controller('GoogleOauthCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){
        var get_params = $location.search();
        $scope.access_token = get_params.code;
        $http.post('/api/activity/adsfadsfadsfasdf/add_gcalendar',{'access_token': $scope.access_token},function(data){
            console.log(data);
        });
        
    }]);
