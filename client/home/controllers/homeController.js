angular.module('beerMeteor').controller('HomeController', ['$scope', '$meteor', '$mdDialog',
    function ($scope, $meteor, $mdDialog) {

    $scope.events = $meteor.collection(Events);

    $scope.openAddNewEventModal = function () {
        var modalInstance = $mdDialog.show({
            animation: true,
            templateUrl: 'client/home/view/createNewEventModal.ng.html',
            controller: 'CreateNewEventController',
            clickOutsideToClose:true
      });
    };

    $scope.removeEvent = function(id) {
        $scope.events.remove({_id: id});
    }

    var init = function() {
        console.log("init");
    }
    init();
}]);
