angular.module('beerMeteor', ['angular-meteor', 'ui.router', 'chart.js', 'ui.bootstrap']);

function onReady() {
  angular.bootstrap(document, ['beerMeteor']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
