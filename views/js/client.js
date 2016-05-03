window.onload = function() {
 
    var messages = [];
}

angular.module('app', ['ngMaterial'])
    .controller('FoosBallController', FoosBallController);


function FoosBallController($scope, $timeout) {
    
    var socket = io.connect();
 
    socket.on('goal', function (data) {
        if(data) {
            $scope.$apply(function() {
                if (data.speed) {
                    $scope.redScore = $scope.redScore + 1;
                    $scope.redSpeed = data.speed + ' m/s';
                    console.log('Team ' + data.team + ' scores with a speed of ' + data.speed);
                }
            })
        } else {
            console.log('There is a problem:', data);
        }
    });

    ////////////////

    $scope.redScore = 0;
    $scope.whiteScore = 0;
    $scope.data = '';
    
}