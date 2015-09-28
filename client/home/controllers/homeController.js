angular.module('beerMeteor').controller('HomeController', ['$scope', '$meteor', '$modal',
    function ($scope, $meteor, $modal) {
    
    $scope.events = $meteor.collection(Events);

    $scope.openAddNewEventModal = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'client/home/view/createNewEventModal.ng.html',
        controller: 'CreateNewEventController',
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };

    var init = function() {
        console.log("init");
    }
    init();
}]);
