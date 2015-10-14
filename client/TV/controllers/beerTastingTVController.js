angular.module('beerMeteor').controller('BeerTastingTVController', ['$scope', '$meteor', '$stateParams', '$rootScope', '$location',
        function ($scope, $meteor, $stateParams, $rootScope, $location) {

    $scope.eventObj = $meteor.object(Events, $stateParams.id);

    $scope.beerNum = 1;
    $scope.beerList = $scope.eventObj.beerList;

    // current beer ratings
    $scope.currBeerTaste = 0;
    $scope.currBeerSmell = 0;
    $scope.currBeerFinish = 0;

    // labels and data for beer rating history chart
    $scope.allBeersLabels = [];
    $scope.allBeersSeries = ['Beer rating'];
    $scope.allBeersData = [
        []
    ];
    // labels and data for individual beer rating
    $scope.oneBeerLabels = ['Taste', 'Smell', 'Finish'];
    $scope.oneBeerSeries = ['Beer ' + $scope.beerNum + ' ratings'];
    $scope.oneBeerData = [
        [$scope.currBeerTaste, $scope.currBeerSmell, $scope.currBeerFinish]
    ];

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
    var initializeBeersChart = function() {
        for (var i = 0; i < $scope.beerList.length; i++) {

        }
    };


    var findCombinedRating = function(beerNum) {
        var sum = 0;
        for (var i = 0; i < $scope.beerList[beerNum-1].beerRating.length; i++) {
                sum += $scope.beerList[beerNum-1].beerRating[i].rating;
        }
        return sum;
    };
    var findBeerRating = function(beerNum) {
        var taste = 0, smell = 0, finish = 0;
        var length = $scope.beerList[beerNum-1].beerRating.length;
        for (var i = 0; i < length; i++) {
            taste += $scope.beerList[beerNum-1].beerRating[i].taste;
            smell += $scope.beerList[beerNum-1].beerRating[i].smell;
            finish += $scope.beerList[beerNum-1].beerRating[i].finish;
        }
        return {
            "taste": (taste / length),
            "smell": (smell / length),
            "finish": (finish / length)
        };
    };

    $scope.openMobile = function() {
        $location.path("/beerTasting/" + $stateParams.id);
    }

    var init = function() {
        console.log("init");
        console.log("eventObj: ");
        console.log($scope.eventObj);
        initializeChart();
    };
    init();
}]);
