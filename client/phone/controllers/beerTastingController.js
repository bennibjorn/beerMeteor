angular.module('beerMeteor').controller('BeerTastingController', ['$scope', '$meteor', '$stateParams',
        function ($scope, $meteor, $stateParams) {

    $scope.eventObj = $meteor.object(Events, $stateParams.id);
    $scope.beerRatings = $meteor.object(BeerRating, $stateParams.id);

    var beerNum = 1;
    $scope.tasteGrade = 0;
    $scope.smellGrade = 0;
    $scope.finishGrade = 0;
    // beers sorted by best to worst
    $scope.beerList = $scope.eventObj.beerList;
    //$scope.beerList = {};
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
        if (beerNum - 1 >= $scope.beerList.length) {
            console.log("already rated all beers");
            return;
        }
      var rating = (taste + smell + finish) / 3;
      var beerGrade = {
          'beerNum': beerNum,
          'taste': taste,
          'smell': smell,
          'finish': finish,
          'rating': rating
      };
      console.log("Pushing beer to beerList, beerNum: " + beerNum + ", taste: " + taste + ", smell: " + smell + ", finish: " + finish + ", rating: " + rating);
      //$scope.beerList.save(beerGrade);
      $scope.data[0][beerNum-1] = rating;
      beerNum++;
        // disable button until next beer/round starts
    };
    // removeAll for testing purposes
    window.removeAll = function() {
      $scope.beerList.remove();
    };
    // to sort the beers from best to worst,
    //should be called after all beers have been rated for results
    var sortBeers = function() {
      console.log("sortBeers called");
      //var listLength = $scope.beerList.size();
      //console.log("listLength: " + listLength);
    };
    var updateChart = function() {
        // get amount of beers
        // avoid duplicates, might have to clear data before this
        for (var i = 0; i < $scope.beerList.length; i++) {
            console.log("pushing beerNum: " + $scope.beerList[i].beerNum + ", and rating: " + 0);
            $scope.labels.push($scope.beerList[i].beerNum);
            $scope.data[0].push(0);
        }

    };

    var init = function() {
        console.log("init");
        console.log("eventObj: ");
        console.log($scope.eventObj);
        console.log("beerList.length = " + $scope.beerList.length);
        updateChart();
    };
    init();
}]);
