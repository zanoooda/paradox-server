var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Paradox server 0.0.17\n");
});

server.listen(process.env.PORT);
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    console.log(socket.id.toString() + ' connected');

    socket.on('play', function (data) {
        console.log(socket.id.toString() + ' want to play, looking for the opponent');

        socket.isOnline = true;
        socket.isPlaying = false;

        //
        var b = false;
        var ids = Object.keys(io.sockets.connected);
        ids.forEach(function(id) {
            var s = io.sockets.connected[id];
            // do something with socket here
            if(!b && s.isOnline && !s.isPlaying && s.id != socket.id) {
                s.isPlaying = true;
                socket.isPlaying = true;
                s.opponentId = socket.id;
                socket.opponentId = s.id;

                b = true;

                socket.emit('get-opponent', s.id);
            }
            //console.log(s.id, s.isOnline, s.isPlaying);
        });

        if(!b) {
            // no opponents right now
        }
        
    });
});