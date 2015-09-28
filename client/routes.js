angular.module('beerMeteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('beerTasting', {
      url: '/beerTasting/:id',
      templateUrl: 'client/phone/view/beerTasting.ng.html',
      controller: 'BeerTastingController'
    })
    .state('home', {
    	url: '/home',
    	templateUrl: 'client/home/view/home.ng.html',
    	controller: 'HomeController'
    });

  $urlRouterProvider.otherwise("/home");
}]);
