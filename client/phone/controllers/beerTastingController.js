angular.module('beerMeteor').controller('BeerTastingController', ['$scope', '$meteor', '$stateParams', '$rootScope', '$location',
        function ($scope, $meteor, $stateParams, $rootScope, $location) {

    $scope.eventObj = $meteor.object(Events, $stateParams.id);

    $scope.beerNum = 1;
    $scope.tasteGrade = 0;
    $scope.smellGrade = 0;
    $scope.finishGrade = 0;
    $scope.beerList = $scope.eventObj.beerList;

    // labels and data for beer rating history chart
    $scope.labels = [];
    $scope.series = ['Beer rating'];
    $scope.data = [
        []
    ];

    // adds the rating of the beer to the list
    $scope.addBeer = function(taste, smell, finish) {
        if (taste === 0 || smell === 0 || finish === 0) {
            console.log("taste, smell and/or finish is not set");
            return;
        }
        if ($scope.beerNum - 1 >= $scope.beerList.length) {
            console.log("already rated all beers");
            return;
        }
        var rating = (taste + smell + finish) / 3;
        var beerGrade = {
          'user': $rootScope.currentUser._id,
          'taste': taste,
          'smell': smell,
          'finish': finish,
          'rating': rating
        };
        $scope.data[0][$scope.beerNum-1] = rating;
        $scope.beerList[$scope.beerNum-1].beerRating.push(beerGrade);

        // increment beerNum and reset all grades to 0
        $scope.beerNum++;
        $scope.tasteGrade = 0;
        $scope.smellGrade = 0;
        $scope.finishGrade = 0;
        // TODO: disable button until next beer/round starts
    };
    var updateChart = function() {
        // get amount of beers
        // avoid duplicates, might have to clear data before this
        for (var i = 0; i < $scope.beerList.length; i++) {
            $scope.labels.push($scope.beerList[i].beerNum);
            // stopChecking is used to reduce checks
            // if a beer hasn't been rated, we can be sure that the beer after that has also not been rated
            var stopChecking = false;
            var r;
            // check for beerRatings already in system
            if (stopChecking) {
                r = null;
            } else {
                r = findRating($scope.beerList[i].beerNum)
            }
            if (r != null) {
                $scope.data[0].push(r);
                // increment beerNum if already rated
                $scope.beerNum++;
                console.log("pushing beerNum: " + $scope.beerList[i].beerNum + ", and rating: " + r);
            } else {
                // else put rating as 0 and keep beerNum the same
                $scope.data[0].push(0);
                console.log("pushing beerNum: " + $scope.beerList[i].beerNum + ", and rating: " + 0);
                stopChecking = true;
            }
        }

    };

    var findRating = function(beerNum) {
        for (var i = 0; i < $scope.beerList[beerNum-1].beerRating.length; i++) {
            if ($scope.beerList[beerNum-1].beerRating[i].user === $rootScope.currentUser._id) {
                return $scope.beerList[beerNum-1].beerRating[i].rating;
            }
        }
        return null;
    }

    $scope.openTV = function() {
        $location.path("/beerTasting/" + $stateParams.id + "/TV");
    }

    var init = function() {
        console.log("init");
        console.log("eventObj: ");
        console.log($scope.eventObj);
        console.log("currentUser:");
        console.log($rootScope.currentUser);
        console.log($stateParams);
        updateChart();
    };
    init();
}]);
