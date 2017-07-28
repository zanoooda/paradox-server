var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

app.use('/', express.static(path.join(__dirname, 'public')));

server.listen(process.env.PORT,  process.env.IP, function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});



var io = require('socket.io')(app);


io.on('connection', function (socket) {
  console.log('Hello server!');
});