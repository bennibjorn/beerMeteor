angular.module('beerMeteor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('beerTasting', {
      url: '/beerTasting/:id',
      templateUrl: 'client/phone/view/beerTasting.ng.html',
      controller: 'BeerTastingController',
      resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
    })
    .state('beerTastingTV', {
      url: '/beerTasting/:id/TV',
      templateUrl: 'client/TV/view/beerTastingTV.ng.html',
      controller: 'BeerTastingTVController',
      resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
    })
    .state('home', {
    	url: '/home',
    	templateUrl: 'client/home/view/home.ng.html',
    	controller: 'HomeController'
    });

  $urlRouterProvider.otherwise("/home");
}]);

// error handling

angular.module("beerMeteor").run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('/home');
    }
  });
}]);
