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

    Meteor.autosubscribe(function() {
        Events.find().observe({
            changed: function() {
                updateAllBeersChart();
            }
        });
    });
    /*
    Meteor.methods({
        updateTVcharts: function () {
            updateAllBeersChart();
      }
    });
*/
    $scope.beerNum = 1;
    $scope.beerList = $scope.eventObj[0].beerList;
    $scope.beerDesc = $scope.beerList[$scope.beerNum-1].beerDesc;
    $scope.beerRatings = $scope.eventObj[0].beerRatings;
    // current beer ratings
    $scope.currBeerTaste = 0;
    $scope.currBeerSmell = 0;
    $scope.currBeerFinish = 0;

    var participants = [];
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
        return sum / getParticipants();
    };
    var findCurrBeerRatings = function(beerNum) {
        var taste = 0, smell = 0, finish = 0;
        for (var i = 0; i < $scope.beerRatings.length; i++) {
            if ($scope.beerRatings[i].beerNum === beerNum) {
                $scope.currBeerTaste += $scope.beerRatings[i].taste;
                $scope.currBeerSmell += $scope.beerRatings[i].smell;
                $scope.currBeerFinish += $scope.beerRatings[i].finish;
            }
        }
    };
    var updateAllBeersChart = function() {
        for (var i = 0; i < $scope.beerList.length; i++) {
            $scope.allBeersLabels[i] = $scope.beerList[i].beerNum;
            $scope.allBeersData[0][i] = findBeerRatings($scope.beerList[i].beerNum);
        }
    };
    var initializeCurrBeersChart = function() {
        findCurrBeerRatings($scope.beerNum);
    };
    var getParticipants = function() {
        for (var i = 0; i < $scope.beerRatings.length; i++) {
            if (participants.indexOf($scope.beerRatings[i].user) === -1) {
                participants.push($scope.beerRatings[i].user);
            }
        }
        console.log("participants: ");
        console.log(participants);
        return participants.length;
    };

    $scope.openMobile = function() {
        $location.path("/beerTasting/" + $stateParams.id);
    };

    $scope.nextbeer = function() {
        if ($scope.beerNum === $scope.beerList.length) {
            return;
        }
        $scope.beerNum++;
    };

    var init = function() {
        console.log("init");
        console.log("eventObj: ");
        console.log($scope.eventObj);
        // initialize allBeers chart
        updateAllBeersChart();
        // initialize currBeer chart
        initializeCurrBeersChart();
        getParticipants();
    };
    init();


}]);
