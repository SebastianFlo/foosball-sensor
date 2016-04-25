//start.js
var spawn = require('child_process').spawn,
    py    = spawn('python', ['-u', 'listen.py']);

/*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), 
we want to convert that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function(data){
  console.log(data.toString());
});

/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
py.stdout.on('end', function(){
  console.log('Listening to sensor stopped');
});

py.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
    // Error occurred;
});

py.on('close', function(code) {
    console.log('child process exited with code ' + code);
});
