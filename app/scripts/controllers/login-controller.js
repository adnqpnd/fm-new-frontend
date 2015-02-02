'use strict';

angular.module('fmApp')
.controller('LoginCtrl',['$scope', 'authService', '$state', '$window', function($scope, authService, $state, $window){
	$scope.error = "";
	$scope.showError = false;
    
    $scope.closeError = function (option) {
      $scope.showError = option;
    }

	$scope.login = function (data) {
	  var loginData = {
       "username" : data.username,
       "password" : data.password
	  };

	 authService.login('/users/login',loginData).success(function (data) {
        var status = data.status;

        if(status.code === 1) {
          var userInfo = data.userinfo;
          authService.setToken(data.token);
          var token = authService.getToken();
          
          switch(userInfo.type) {
            case 'admin':
              $state.go('admin.dssr');
              break;
            case 'encoder':
              $state.go('encoder');
              break;
            case 'cashier':
              $state.go('cashier');
              break;
            case 'checker':
              $state.go('checker');
          }
        }else{
          $scope.error = status.message;
	      $scope.showError = true;
        }

	  }).error(function (error) {
        $log.error("Error login :" + error);
	  })

	}
}]);
