var http = require('http');
var server = http.createServer(function(req, res) {
    res.end(Object.keys(io.sockets.connected).length + ' users online');
});
server.listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log(socket.id, 'connected');

    socket.on('play', function() {
        console.log(socket.id, 'play');

        socket.emit('counter', Object.keys(io.sockets.connected).length);

        socket.opponentId = getOpponentId(socket, io);
        if(socket.opponentId) {
            console.log(socket.id, 'opponent-found');

            io.sockets.connected[socket.opponentId].opponentId = socket.id;

            io.sockets.connected[socket.opponentId].emit('opponent-found', 1);
            socket.emit('opponent-found', 0);
        }
    });

    socket.on('move', function(move) {
        console.log(`${ocket.id}, move ${move}`);

        if(socket.opponentId && io.sockets.connected[socket.opponentId]) {
            socket.broadcast.to(socket.opponentId).emit('move', move);
        }
    });

    socket.on('disconnect', function() {
        console.log(socket.id, 'disconnect');

        if(socket.opponentId && io.sockets.connected[socket.opponentId]) {
            io.sockets.connected[socket.opponentId].disconnect();
        }
    });
});

function getOpponentId(socket, io) {
    var opponentId = false;

    var b = false;
    var ids = Object.keys(io.sockets.connected);
    ids.forEach(function(id) {
        var s = io.sockets.connected[id];
        if(
            !b && 
            s.id != socket.id &&
            s.opponentId !== undefined && 
            !s.opponentId
        ) {
            opponentId = s.id;
            b = true;
        }
    });

    return opponentId;
}