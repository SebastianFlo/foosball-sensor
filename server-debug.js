var express = require("express");
var app = express();
var port = 3700;
var debounce = require('debounce');
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    child;

app.use(express.static(__dirname + '/views'));  

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/views/index.html');  
});

var io = require('socket.io').listen(app.listen(port));

console.log("Listening on port " + port);

// child1 = spawn('python', ['-u', 'listen1.py']);
// child2 = spawn('python', ['-u', 'listen2.py']);

child1 = spawn('python', ['-u', 'listen-debug1.py']);
child2 = spawn('python', ['-u', 'listen-debug2.py']);

io.sockets.on('connection', function(socket)
{
    
    child1.stdout.on('data', debugData);
    child2.stdout.on('data', debugData);
    
    function debugData(data) {
        console.log(data.toString());
        // var result = data.toString();
        // var id = result.split(':')[0];
        // console.log(id);
    }
    
    function emitGoal(data){
        // set debounce
        var result = data.toString();
        var id = result.split(':')[0];
        var speed = result.split(':')[1];
        if (speed) {
            var goal = {
                team: id,
                speed: speed
            }
            console.log('Team ' + goal.team + ' scores');
            io.sockets.emit('goal', goal);
        }
    }
  
    child1.on('close', function(code) {
      console.log('child 1 process exited with code ' + code);
    });

    child2.on('close', function(code) {
      console.log('child 2 process exited with code ' + code);
    });
  
}); // end on connection

