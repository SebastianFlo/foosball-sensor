var express = require("express");
var app = express();
var port = 3700;
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    child;

app.use(express.static(__dirname + '/views'));  

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/views/index.html');  
});

var io = require('socket.io').listen(app.listen(port));

child = spawn('node', ['listen.js']);

// io.sockets.on('connection', function (socket) {
    
//     child.stdout.on('data', function (data) {
//         console.log('Child says: ' + data);
//         io.sockets.emit('message', data);
//     });
    
//     socket.on('doRestart', function (data) {
// 	    console.log('Restarting...');
//         io.sockets.emit('restart', { }); 
//     });
// });

child.stdout.on('data', function (data) {
        var result = data.toString();
        console.log('Child says: ' + result);
});

console.log("Listening on port " + port);

