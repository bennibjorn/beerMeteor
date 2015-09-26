angular.module('beerMeteor').controller('PhoneInputController', ['$scope', '$meteor', function ($scope, $meteor) {
      var beerNum = 0;
      $scope.tasteGrade = 0;
      $scope.smellGrade = 0;
      $scope.finishGrade = 0;
      // beers sorted by best to worst
      $scope.beerList = $meteor.collection(Beers);
      //$scope.beerList = {};

      $scope.submit = function(taste, smell, finish) {
          // socket.emit send in grades

          // update list of beers and sort
          addBeer(taste, smell, finish);
      }

      // adds the rating of the beer to the list
      $scope.addBeer = function(taste, smell, finish) {
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
          var listLength = $scope.beerList.length();
          console.log("listLength: " + listLength);
      }

      // socket.on('beerNum') - sets the number of the beer

      var init = function() {
          console.log("init");
      }
      init();
  }]);
