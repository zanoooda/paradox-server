var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT);

var io = require('socket.io')(app);

io.on('connection', function (socket) {
  console.log('Hello server!');
});