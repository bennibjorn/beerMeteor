angular.module("beerMeteor").controller("CreateNewEventController", ['$scope', '$meteor', '$rootScope', '$state', '$mdDialog',
  function ($scope, $meteor, $rootScope, $state, $mdDialog) {

      var events = $meteor.collection(Events);

      //$scope.owner = $rootScope.currentUser._id;
      $scope.eventName = "";

      $scope.beerName = "";
      $scope.beerList = [];
      var beerNum = 1;

      $scope.addBeerToList = function() {
          var beerEntry = {
              "beerNum": beerNum,
              "beerName": $scope.beerName,
              "beerRating": []
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
        var e = {
            "name": "",
            "owner": "",
            "started": false,
            "beerList": {}
        }
        e.owner = $rootScope.currentUser._id;
        e.name = $scope.eventName;
        e.started = false;
        e.beerList = $scope.beerList;
        events.push(e);
        console.log("created a new event, event object:");
        console.log(e);
        $mdDialog.hide();
    }
    $scope.removeFromList = function(name) {
        for (var i = 0; i < $scope.beerList.length; i++) {
            if ($scope.beerList[i].beerName == name) {
                $scope.beerList.splice(i, 1);
            }
        }
    }

    var init = function() {
        //console.log($rootScope.currentUser._id);
    }
    init();
}]);
