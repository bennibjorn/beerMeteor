angular.module('beerMeteor').controller('HomeController', ['$scope', '$meteor', function ($scope, $meteor) {
    
    $scope.events = {};

    


    var init = function() {
        console.log("init");
    }
    init();
}]);
