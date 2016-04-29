window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
 
    socket.on('message', function (data) {
        if(data.message) {
            console.log(data);
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
}

angular.module('app', ['ngMaterial']);
