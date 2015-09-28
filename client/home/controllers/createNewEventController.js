angular.module("beerMeteor").controller("CreateNewEventController", ['$scope', '$meteor', '$rootScope', '$state', '$modalInstance',
  function ($scope, $meteor, $rootScope, $state, $modalInstance) {

      var events = $meteor.collection(Events);

      //$scope.owner = $rootScope.currentUser._id;
      $scope.owner = "benni";
      $scope.eventName = "";

      $scope.beerName = "";
      $scope.beerList = [];
      var beerNum = 1;

      $scope.addBeerToList = function() {
          var beerEntry = {
              "beerNum": beerNum,
              "beerName": $scope.beerName
          }
          for (var i = 0; i < $scope.beerList.length; i++) {
              if ($scope.beerList[i].beerName == $scope.beerName || $scope.beerName == "") {
                  // duplicate submission, ignore
                  return;
              }
          }
          // push entry to list
          $scope.beerList.push(beerEntry);
          // and clear name
          $scope.beerName = "";
          beerNum++;
      }

    $scope.addNewEvent = function () {
        var newEvent = {
            "name": $scope.eventName,
            "owner": $scope.owner,
            "started": false,
            "beerList": $scope.beerList
        }
        events.push(newEvent);
        $modalInstance.close();
    }
    $scope.removeFromList = function(name) {
        for (var i = 0; i < $scope.beerList.length; i++) {
            if ($scope.beerList[i].beerName == name) {
                $scope.beerList.splice(i, 1);
            }
        }
    }
}]);
