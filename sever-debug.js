var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    child;

child1 = spawn('python', ['-u', 'listen1.py']);
child2 = spawn('python', ['-u', 'listen2.py']);
    
    child1.stdout.on('data', emitGoal);
    child2.stdout.on('data', emitGoal);
    
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
        }
    }
  
    child1.on('close', function(code) {
      console.log('child 1 process exited with code ' + code);
    });

    child2.on('close', function(code) {
      console.log('child 2 process exited with code ' + code);
    });




