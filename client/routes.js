angular.module('beerMeteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('phone', {
      url: '/phone',
      templateUrl: 'client/phone/view/phone.ng.html',
      controller: 'PhoneInputController'
    })
    .state('home', {
    	url: '/home',
    	templateUrl: 'client/home/view/home.ng.html',
    	controller: 'HomeController'
    });

  $urlRouterProvider.otherwise("/home");
}]);
