'use strict';

angular.module('fmApp', ['ui.router'] )

.constant('serviceHost','http://localhost:1337')
.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url:'/',
      templateUrl: 'templates/main/login.html',
      controller: 'LoginCtrl'
    })

    .state('admin', {
      url:'/admin',
      abstract: true,
      templateUrl: 'templates/main/admin.html'
    })
      .state('admin.accounts', {
        url:'/accounts',
        views: {
          'adminContent': {
            templateUrl: 'templates/accounts.html'
          }
        }  
      })
      .state('admin.delivery-overview', {
        url:'/sales/delivery-overview',
        views: {
          'adminContent': {
            templateUrl: 'templates/delivery-overview.html'
          }
        }  
      })
      .state('admin.dssr', {
        url:'/sales/dssr',
        views: {
          'adminContent': {
            templateUrl: 'templates/dssr.html'
          }
        }  
      })
      .state('admin.inventory', {
        url:'/inventory',
        views: {
          'adminContent': {
            templateUrl: 'templates/inventory.html'
          }
        }  
      })
      .state('admin.products', {
        url:'/inventory/products',
        views: {
          'adminContent': {
            templateUrl: 'templates/products.html'
          }
        }  
      })
      .state('admin.variants', {
        url:'/inventory/variants',
        views: {
          'adminContent': {
            templateUrl: 'templates/variants.html'
          }
        }  
      })
    

    .state('encoder', {
      url:'/encoder',
      abstract: true,
      templateUrl: 'templates/main/encoder.html'
    })
      .state('encoder.add-delivery', {
        url:'/sales/add-delivery',
        views: {
          'encoderContent': {
            templateUrl: 'templates/add-delivery.html'
          }
        }  
      })
      .state('encoder.inventory', {
        url:'/inventory',
        views: {
          'encoderContent': {
            templateUrl: 'templates/replenish-inventory.html'
          }
        }  
      })

    .state('cashier', {
      url:'/cashier',
      abstract: true,
      templateUrl: 'templates/main/cashier.html'
    })
      .state('cashier.pos', {
        url:'/pos',
        views: {
          'cashierContent': {
            templateUrl: 'templates/pos.html'
          }
        }  
      })


    .state('checker', {
      url:'/checker',
      abstract: true,
      templateUrl: 'templates/main/checker.html'
    })
      .state('checker.tally', {
        url:'/tally',
        views: {
          'checkerContent': {
            templateUrl: 'templates/tally.html'
          }
        }  
      })
      .state('checker.bad-order', {
        url:'/bad-order',
        views: {
          'checkerContent': {
            templateUrl: 'templates/bad-order.html'
          }
        }  
      })

}])	

.controller('MainCtrl',['$scope', 'authService', '$http','serviceHost','$state', function($scope, authService,$http,serviceHost,$state){
  $scope.logout = function () {
    authService.logout();
    $state.go('login');
  }

  $scope.getUsers = function () {
    $http.get(serviceHost+'/users').success(function (data) {
      console.log(data);
    }).error(function (err) {
      console.log(err);
    })
  }
}]);

