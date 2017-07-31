var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Paradox server 0.0.15\n");
});

server.listen(process.env.PORT);
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    console.log(socket.id.toString() + ' connected');

    //var clients = io.sockets.clients();
    // clients.sockets.forEach(function(element) {
    //     console.log(element.id);
    // }, this);
    // console.log(clients);

    var ids = Object.keys(io.sockets.connected);
    ids.forEach(function(id) {
        var s = io.sockets.connected[id];
        // do something with socket here
        console.log(s.id, s.isOnline, s.isPlaying);
    });

    socket.on('play', function (data) {
        console.log(socket.id.toString() + ' want to play, looking for the opponent');

        socket.isOnline = true;
        socket.isPlaying = false;

        //
        
        var data = { opponent: 'petya'};
        socket.emit('get-opponent', data);
    });
});