var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World\n");
});

server.listen(process.env.PORT);

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('server listen');
  //
});