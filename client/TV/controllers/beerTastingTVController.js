angular.module('beerMeteor').controller('BeerTastingTVController', ['$scope', '$meteor', '$stateParams', '$rootScope', '$location',
        function ($scope, $meteor, $stateParams, $rootScope, $location) {

    $scope.eventObj = $meteor.collection(Events).subscribe("event-ratings", $stateParams.id);

    $scope.eventObj = $meteor.collection(function() {
        return Events.find({"_id": $stateParams.id}, {
            eventObj : $scope.getReactively('eventObj')     // Every time $scope.sort will change, the reactive function will re-run again
        });
    });
    $meteor.autorun($scope, function() {
      $meteor.subscribe('event-ratings', $stateParams.id, {
        eventObj: $scope.getReactively('eventObj')
      }).then(function() {
        console.log('new beerRatings in page - ');
        console.log($scope.beerRatings);
      });
    });

    $scope.beerNum = 1;
    $scope.beerList = $scope.eventObj[0].beerList;
    $scope.beerRatings = $scope.eventObj[0].beerRatings;
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

    var findBeerRatings = function(beerNum) {
        var sum = 0;
        for (var i = 0; i < $scope.beerRatings.length; i++) {
            if ($scope.beerRatings[i].beerNum === beerNum) {
                sum += $scope.beerRatings[i].rating;
            }
        }
        return sum;
    };
    var findCurrBeerRatings = function(beerNum) {
        var taste = 0, smell = 0, finish = 0;
        for (var i = 0; i < $scope.beerRatings.length; i++) {
            if (var br = $scope.beerRatings[i].beerNum === beerNum) {
                taste += br.taste;
                smell += br.smell;
                finish += br.finish;
            }
        }
        var current = {
            "taste": taste,
            "smell": smell,
            "finish": finish
        };
        return current;
    };

    $scope.openMobile = function() {
        $location.path("/beerTasting/" + $stateParams.id);
    };

    var init = function() {
        console.log("init");
        console.log("eventObj: ");
        console.log($scope.eventObj);
        //initializeChart();
    };
    init();
}]);
