var childProcess = require('child_process'),
  exec = childProcess.exec,
  spawn = childProcess.spawn,
  fs = require('fs'),
  path = require('path'),
  port = process.env.PORT,
  execute = function(command, args, callback) {
    console.log(command + ' ' + args.join(' '));
    var command = spawn(command, args);
    command.stdout.on('data', function (data) {
      process.stdout.write(data);
    });
    command.stderr.on('data', function (data) {
      process.stderr.write(data);
    });
    command.on('exit', callback || function(){});
  },
  startServer = function() {
    var express = require('express'),
      argv = require('optimist').argv,
      port = process.env.PORT;
    
    if (argv.watch) {
      var lumbar = spawn('lumbar', ['watch', path.join(__dirname, 'lumbar.json'), path.join(__dirname, 'public')]);
      lumbar.stdout.on('data', function(data) {
        process.stdout.write(data.toString());
      });
      lumbar.stderr.on('data', function(data) {
        process.stdout.write(data.toString());
      });
    }
    
    var server = express.createServer();
    server.use(express.logger());
    server.use(express.bodyParser());
    server.use(express.static(path.join(__dirname, 'public')));
    
    function listen(foundPort) {
      console.log('Express server listening on port ' + foundPort);
      server.listen(foundPort);
    }

    if (!port) {
      require('portscanner').findAPortNotInUse(8000, 8025, 'localhost', function(error, foundPort) {
        listen(foundPort);
      });
    } else {
      listen(port);
    }

    var serverPath = path.join(__dirname, 'server');

    if (!path.existsSync(serverPath)) {
      fs.mkdirSync(serverPath);
    }
    
    fs.readdirSync(serverPath).forEach(function(file) {
      if (file.match(/\.js$/)) {
        //second parameter is reserved for future use, secureServer
        require(path.join(__dirname, 'server', file))(server, null, argv);
      }
    });
  };

if (!path.existsSync(path.join(__dirname, 'node_modules'))) {
  execute('npm',['install'], startServer);
} else {
  startServer();
}
