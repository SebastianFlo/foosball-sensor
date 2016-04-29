window.onload = function() {
 
    var messages = [];
}

angular.module('app', ['ngMaterial'])
    .controller('FoosBallController', FoosBallController);


function FoosBallController($scope) {
    
    var socket = io.connect();
 
    socket.on('goal', function (data) {
        if(data) {
            $scope.redScore++;
        } else {
            console.log("There is a problem:", data);
        }
    });

    ////////////////

    $scope.redScore = 0;
    $scope.whiteScore = 0;
    
    
    
    activate();

}