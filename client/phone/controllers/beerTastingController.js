angular.module('beerMeteor').controller('BeerTastingController', ['$scope', '$meteor', '$stateParams', '$rootScope', '$location',
        function ($scope, $meteor, $stateParams, $rootScope, $location) {

    $scope.eventObj = $meteor.object(Events, $stateParams.id);

    $scope.beerNum = 1;
    $scope.tasteGrade = 0;
    $scope.smellGrade = 0;
    $scope.finishGrade = 0;
    $scope.beerList = $scope.eventObj.beerList;
    $scope.submitDisabled = false;

    // labels and data for beer rating history chart
    $scope.labels = [];
    $scope.series = ['Beer rating'];
    $scope.data = [
        []
    ];

    // adds the rating of the beer to the list
    $scope.addBeer = function(taste, smell, finish) {
        /*
        if (!$scope.eventObj.started) {
            console.log("Event not started/already over");
            return;
        }
        */
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
        //$scope.data[0][$scope.beerNum-1] = rating;
        $scope.beerList[$scope.beerNum-1].beerRating.push(beerGrade);
        console.log($scope.beerList[$scope.beerNum-1]);
        // increment beerNum and reset all grades to 0
        $scope.beerNum++;
        $scope.tasteGrade = 0;
        $scope.smellGrade = 0;
        $scope.finishGrade = 0;
        updateChart();
        console.log("eventObj");
        console.log($scope.eventObj);
        //$scope.submitDisabled = true;
        // TODO: disable button until next beer/round starts
    };
    var initializeChart = function() {
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
                // check if length of data is equal to beerList length
                if ($scope.data[0][i] != 0) {
                    $scope.data[0][i] = r;
                } else {
                    $scope.data[0].push(r);
                }
                    // increment beerNum if already rated
                    $scope.beerNum++;
                    //console.log("pushing beerNum: " + $scope.beerList[i].beerNum + ", and rating: " + r);
            } else {
                // else put rating as 0 and keep beerNum the same
                if ($scope.data[0][i] != 0) {
                    $scope.data[0][i] = 0;
                } else {
                    $scope.data[0].push(0);
                }
                //console.log("pushing beerNum: " + $scope.beerList[i].beerNum + ", and rating: " + 0);
                stopChecking = true;
            }
        }

    };
    var updateChart = function() {
        for(var i = 0; i < $scope.beerList.length; i++) {
            var r = findRating(i+1);
            if (r != null) {
                $scope.data[0][i] = r;
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
    };

    $scope.openTV = function() {
        $location.path("/beerTasting/" + $stateParams.id + "/TV");
    };
    $scope.adminView = function() {

    };

    var init = function() {
        console.log("init");
        console.log("eventObj: ");
        console.log($scope.eventObj);
        console.log("currentUser:");
        console.log($rootScope.currentUser);
        console.log("beerList");
        console.log($scope.beerList);
        initializeChart();
    };
    init();
}]);
