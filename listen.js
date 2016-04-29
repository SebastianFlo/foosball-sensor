var util = require('util'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    child;
    
var listener;

var children = [];
var port = 3700;
var io = require('socket.io').listen(port);

io.sockets.on('connection', function(socket)
{
  
  socket.on('stop', function () {
    child.kill('SIGINT');
    for(var i = 0; i<children.length; i++) 
    {  
        process.kill(Number(children[i]), 'SIGINT');
    }
  }); // end on stop
  
  socket.on('start', function () {
    child = spawn('python', ['-u', 'listen.py']);
    
    child.stdout.on('data', function(data){
      var result = data.toString();
      var triggeredSensor = result.split(':')[1];
      if (triggeredSensor) {
        console.log("Scored by team", triggeredSensor);
      }
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    child.stdout.on('end', function(){
      console.log('Listening to sensor stopped');
    });

    child.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
        // Error occurred;
    });

    child.on('close', function(code) {
        console.log('child process exited with code ' + code);
    });

    server.listen(8124, function() { //'listening' listener
      console.log('server bound');
      child = spawn('python', ['-u', 'listen.py']);
    });

    var net = require('net');
    var server = net.createServer(function(connection) { //'connection' listener

      connection.on('end', function() {
        console.log('client disconnected');
      });
      
      connection.on('data', function(data){
      
          io.sockets.emit('data', data);
          console.log('data', data);
      
      });

    });

  }); // end on start

}); // end on connection

/*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), 
we want to convert that received data into a string and append it to the overall dataString.*/

