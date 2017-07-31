var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Paradox server 0.0.7\n");
});

server.listen(process.env.PORT);
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    console.log(socket.id.toString() + ' connected');

    var clients = io.sockets.clients();
    console.log(clients);

    socket.on('play', function (data) {
        console.log(socket.id.toString() + ' want to play, looking for the opponent');

        socket.isOnline = true;
        socket.isPlaying = false;

        //
        
        var data = { opponent: 'petya'};
        socket.emit('get-opponent', data);
    });
});