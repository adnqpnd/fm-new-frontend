'use strict';

angular.module('fmApp')

.factory('userService',['$http', '$window', '$log', function ($http, $window, $log) {
	var user = {};
	var userAccess = 0;

	return {
	  setUser : function (userInfo) {
	  	user = userInfo;
	  	switch (user.type) {
          case 'admin':
             userAccess = 1;
             break;
          case 'encoder':
             userAccess = 2;
             break;
          case 'cashier':
            userAccess = 3;
             break;
          case 'checker':
             userAccess = 4;
             break;
          default :
             userAccess = 0;
	  	}
	  	$log.debug(userAccess);
	  },

	  getUser : function () {
	  	return user;
	  },
      
      setAccessLevel: function (accessLevel) {
        userAccess = accessLevel;
        $log.debug(userAccess);
      },

	  getAccessLevel: function () {
	  	return userAccess;
	  }
	}
}]);
  