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
                    $scope.teams[data.team -1].score++;
                    if ($scope.teams[data.team -1].score === 10) {
                        $timeout(flashWinner(data.team -1), 1000);
                    }
                    $scope.speed = data.speed + ' m/s';
                    console.log('Team ' + data.team + ' scores with a speed of ' + data.speed);
                }
            });
        } else {
            console.log('There is a problem:', data);
        }
    });
    
    function flashWinner(index) {
            $scope.showWinner = true;
            $scope.winner = $scope.teams[index].name;
    }
    
    function restart() {
        $scope.showWinner = false;
        $scope.teams[0].score = 0;
        $scope.teams[1].score = 0;
    }
    
    function increaseScore(team) {
        team.score++ 
        if (team.score === 10) {
            $timeout(flashWinner(team.id), 500);
        }
    }
    
    function decreaseScore(team) {
        team.score--
        if (team.score < 0) {
            team.score = 0
        }
    }

    ////////////////
    
    $scope.showWinner = false;
    
    $scope.teams = [{
        id: 0,
        name: 'Red',
        score: 0   
        },{
        id: 1,
        name: 'White',
        score: 0 
    }];
    
    $scope.kingMode = false;
    
    $scope.restart = restart;
    $scope.increaseScore = increaseScore;
    $scope.decreaseScore = decreaseScore;
    
}