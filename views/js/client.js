window.onload = function() {
 
    var messages = [];
}

angular.module('app', ['ngMaterial'])
    .controller('FoosBallController', FoosBallController);


function FoosBallController($scope) {
    
    var socket = io.connect();
 
    socket.on('goal', function (data) {
        if(data) {
            $scope.$apply(function() {
                $scope.redScore = $scope.redScore + 1;
                $scope.redSpeed = data.speed;
                console.log("Team " + data.team + " scores with a speed of " + data.speed + "m/s");
            })
        } else {
            console.log("There is a problem:", data);
        }
    });

    ////////////////

    $scope.redScore = 0;
    $scope.whiteScore = 0;
    $scope.data = '';
    
}