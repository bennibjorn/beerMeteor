angular.module('beerMeteor').controller('PhoneInputController', ['$scope', '$meteor', function ($scope, $meteor) {
    var beerNum = 0;
    $scope.tasteGrade = 0;
    $scope.smellGrade = 0;
    $scope.finishGrade = 0;
    // beers sorted by best to worst
    $scope.beerList = $meteor.collection(Beers);
    //$scope.beerList = {};
    // labels and data for beer rating history chart
    $scope.labels = [];
    $scope.series = ['Beer rating'];
    $scope.data = [
        []
    ];

    $scope.submit = function(taste, smell, finish) {
      // socket.emit send in grades

      // update list of beers and sort
      addBeer(taste, smell, finish);
    }

    // adds the rating of the beer to the list
    $scope.addBeer = function(taste, smell, finish) {
        if (taste == 0 || smell == 0 || finish == 0) {
            console.log("taste, smell and/or finish is not set");
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
      $scope.beerList.save(beerGrade);
      beerNum++;
    }
    // removeAll for testing purposes
    window.removeAll = function() {
      $scope.beerList.remove();
    }
    var sortBeers = function() {
      console.log("sortBeers called");
      //var listLength = $scope.beerList.size();
      console.log("listLength: " + listLength);
    }
    var updateChart = function() {
        for (var i = 0; i < 4; i++) {
            console.log("pushing beerNum: " + $scope.beerList[i].beerNum + ", and rating: " + $scope.beerList[i].rating);
            $scope.labels.push($scope.beerList[i].beerNum);
            $scope.data[0].push($scope.beerList[i].rating);
        }
    }

    // socket.on('beerNum') - sets the number of the beer

    var init = function() {
        console.log("init");
        //console.log("beerList.size() = " + $scope.beerList.size());
        updateChart();
    }
    init();
}]);
