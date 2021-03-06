angular.module('beerMeteor').controller('AdminController', ['$scope', '$meteor', '$stateParams', '$rootScope', '$location',
        function ($scope, $meteor, $stateParams, $rootScope, $location) {

    //$scope.eventObj = $meteor.object(Events, $stateParams.id);
    $scope.eventObj = $meteor.collection(Events).subscribe("event-ratings", $stateParams.id);
    $scope.beerList = $scope.eventObj[0].beerList;
    $scope.currBeerNum = $scope.eventObj[0].currentBeer;
    $scope.currBeerName = $scope.beerList[$scope.currBeerNum - 1].beerName;

    $scope.startEvent = function() {
        $scope.eventObj[0].started = true;
    };

    $scope.stopEvent = function() {
        $scope.eventObj[0].started = false;
    };

    $scope.normalView = function() {
        $location.path('/beerTasting/' + $stateParams.id);
    };

    $scope.nextBeer = function() {
        $scope.eventObj[0].currentBeer = $scope.eventObj[0].currentBeer + 1;
        console.log($scope.eventObj);
    };

    var init = function() {
        console.log("eventObj");
        console.log($scope.eventObj);
        console.log("beerList");
        console.log($scope.beerList);
        if ($rootScope.currentUser._id != $scope.eventObj[0].owner) {
            console.log("user not authorized");
            $location.path('/beerTasting/' + $stateParams.id);
        }
    };
    init();
}]);
