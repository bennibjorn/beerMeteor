angular.module('beerMeteor').controller('HomeController', ['$scope', '$meteor',
    function ($scope, $meteor) {
    
    $scope.events = $meteor.collection(Events);

    $scope.createEvent = function() {
        // modal create new event
    }

    var init = function() {
        console.log("init");
    }
    init();
}]);
