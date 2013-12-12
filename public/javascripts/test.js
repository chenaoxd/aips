var phonecatApp = angular.module('phonecatApp',[]);
phonecatApp.controller('PhoneListCtrl', function($scope){
    $scope.phones = [
        {'name': 'Nexus S',
         'snippet': 'phone1'},
        {'name': 'GSII',
         'snippet': 'phone 2'},
        {'name': 'iphone',
         'snippet': 'test 3'}
    ];
});
