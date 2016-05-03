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

io.sockets.on('connection', function (socket) {
    
    socket.on('send', function (data) {
        console.log('Child says: ' + data);
        io.sockets.emit('message', data);
    });

});

console.log("Listening on port " + port);

child = spawn('python', ['-u', 'listen.py']);

io.sockets.on('connection', function(socket)
{
    
    child.stdout.on('data', function(data){
    var result = data.toString();
    var triggeredSensor = result.split(':')[0];
    var speed = result.split(':')[1];
    if (triggeredSensor) {
      console.log("Scored by team" + triggeredSensor + " with speed of " + speed + " m/s");
        var goal = {
            team: triggeredSensor,
            speed: speed
        }
        io.sockets.emit('goal', goal);
    }
  });
  
    child.on('close', function(code) {
      console.log('child process exited with code ' + code);
  });
  

}); // end on connection




