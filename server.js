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

console.log("Listening on port " + port);

child = spawn('python', ['-u', 'listen.py']);

io.sockets.on('connection', function(socket)
{
    
    var startTime, prevTime;
    child.stdout.on('data', function(data){
        startTime = Math.floor(Date.now() / 1000);
        // set debounce
        if (startTime - prevTime > 0.5) {
            console.log('Start Time', startTime);
            var result = data.toString();
            var triggeredSensor = result.split(':')[0];
            var speed = result.split(':')[1];
            if (speed) {
                var goal = {
                    team: triggeredSensor,
                    speed: speed
                }
                io.sockets.emit('goal', goal);
            }
        }
        prevTime = startTime;
    });
  
    child.on('close', function(code) {
      console.log('child process exited with code ' + code);
  });
  

}); // end on connection




