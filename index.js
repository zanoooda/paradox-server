var http = require('http');
var server = http.createServer(function(req, res) {
    res.end(Object.keys(io.sockets.connected).length + ' users online');
});
server.listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log(socket.id, 'connected');

    socket.emit('counter', Object.keys(io.sockets.connected).length);

    socket.partnerId = getPartnerId(socket, io);
    if(socket.partnerId) {
        console.log(socket.id, 'partner-found');

        io.sockets.connected[socket.partnerId].partnerId = socket.id;

        io.sockets.connected[socket.partnerId].emit('partner-found', 0);
        socket.emit('partner-found', 1);
    }

    socket.on('move', function(move) {
        console.log(`${socket.id}, move ${move}`);

        if(socket.partnerId && io.sockets.connected[socket.partnerId]) {
            socket.broadcast.to(socket.partnerId).emit('move', move);
        }
    });

    socket.on('disconnect', function() {
        console.log(socket.id, 'disconnect');

        if(socket.partnerId && io.sockets.connected[socket.partnerId]) {
            io.sockets.connected[socket.partnerId].disconnect();
        }
    });
});

function getPartnerId(socket, io) {
    var partnerId = false;

    var b = false;
    var ids = Object.keys(io.sockets.connected);
    ids.forEach(function(id) {
        var s = io.sockets.connected[id];
        if(
            !b && 
            s.id != socket.id &&
            s.partnerId !== undefined && 
            !s.partnerId
        ) {
            partnerId = s.id;
            b = true;
        }
    });

    return partnerId;
}