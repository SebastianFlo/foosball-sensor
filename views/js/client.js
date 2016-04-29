window.onload = function() {
 
    var messages = [];
    var socket = io.connect();
 
    socket.on('goal', function (data) {
        if(data) {
            console.log(data);
        } else {
            console.log("There is a problem:", data);
        }
    });
}

angular.module('app', ['ngMaterial']);
