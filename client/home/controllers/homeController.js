angular.module('beerMeteor').controller('HomeController', ['$scope', '$meteor', function ($scope, $meteor) {
    
    $scope.events = [
        {
            "id": 0,
            "name": "bjorsmokkun benna",
            "owner": "bennibjorn@hotmail.com",
            "public": true
        }
    ];

    


    var init = function() {
        console.log("init");
    }
    init();
}]);
