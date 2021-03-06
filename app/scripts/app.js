'use strict';

angular.module('fmApp', ['ui.router','sails.io'] )

.constant('serviceHost','http://localhost:1337')
.constant('accessLevels', {
  'visitor': 0,
  'admin': 1,
  'encoder': 2,
  'cashier': 3,
  'checker': 4
})
.config(['$urlRouterProvider', '$stateProvider','accessLevels', function ($urlRouterProvider, $stateProvider, accessLevels) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url:'/',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      data: {
        access: accessLevels.visitor
      }
    })

    .state('admin', {
      url:'/admin',
      abstract: true,
      templateUrl: 'templates/main.html',
      data: {
        access: accessLevels.admin
      }
    })
      .state('admin.accounts', {
        url:'/accounts',
        views: {
          'mainContent': {
            templateUrl: 'templates/accounts.html'
          }
        }  
      })
      .state('admin.purchase-overview', {
        url:'/sales/purchase-overview',
        views: {
          'mainContent': {
            templateUrl: 'templates/purchase-overview.html'
          }
        }  
      })
      .state('admin.dssr', {
        url:'/sales/dssr',
        views: {
          'mainContent': {
            templateUrl: 'templates/dssr.html'
          }
        }  
      })
      .state('admin.inventory', {
        url:'/inventory',
        views: {
          'mainContent': {
            templateUrl: 'templates/inventory.html'
          }
        }  
      })
      .state('admin.products', {
        url:'/inventory/products',
        views: {
          'mainContent': {
            templateUrl: 'templates/products.html'
          }
        }  
      })
      .state('admin.sku', {
        url:'/inventory/sku',
        views: {
          'mainContent': {
            templateUrl: 'templates/sku.html'
          }
        }  
      })
    

    .state('encoder', {
      url:'/encoder',
      abstract: true,
      templateUrl: 'templates/main.html',
      data: {
        access: accessLevels.encoder
      }
    })
      .state('encoder.add-delivery', {
        url:'/sales/add-delivery',
        views: {
          'mainContent': {
            templateUrl: 'templates/add-delivery.html'
          }
        }  
      })
      .state('encoder.purchases', {
        url:'/inventory',
        views: {
          'mainContent': {
            templateUrl: 'templates/purchases.html'
          }
        }  
      })

    .state('cashier', {
      url:'/cashier',
      abstract: true,
      templateUrl: 'templates/main.html',
      data: {
        access: accessLevels.cashier
      }
    })
      .state('cashier.pos', {
        url:'/pos',
        views: {
          'mainContent': {
            templateUrl: 'templates/pos.html'
          }
        }  
      })


    .state('checker', {
      url:'/checker',
      abstract: true,
      templateUrl: 'templates/main.html',
      data: {
        access: accessLevels.checker
      }
    })
      .state('checker.tally', {
        url:'/tally',
        views: {
          'mainContent': {
            templateUrl: 'templates/tally.html'
          }
        }  
      })
      .state('checker.bad-order', {
        url:'/bad-order',
        views: {
          'mainContent': {
            templateUrl: 'templates/bad-order.html'
          }
        }  
      })

}])	

.run(['$rootScope','$state','userService','authService', function ($rootScope, $state, userService,authService) {
  
  if (!authService.getToken()) {
    $state.go('login');
    console.log('login run');
  }else {
    var user = JSON.parse(userService.getUser());
    userService.setAccessLevel(user);
  }

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
     console.log("state change");
     console.log(userService.getAccessLevel());
     console.log(toState.data.access);
    


      if (!(userService.getAccessLevel() === toState.data.access) ) {
        if(userService.getAccessLevel() !== 1){
          event.preventDefault();

          switch (userService.getAccessLevel()) {
            case 1:
              $state.go('admin.dssr');
              break;
            case 2:
              $state.go('encoder.add-delivery');
              break;
            case 3:
              $state.go('cashier.pos');
              break;
            case 4:
              $state.go('checker.tally');
              break;
            default:
              userService.removeAccessLevel();
              $state.go('login');
          }
        }

      }
    });

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

