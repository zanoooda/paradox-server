var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Paradox server 001\n");
});

server.listen(process.env.PORT);
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    console.log('who connected');

    socket.on('play', function (data) {
        //
        console.log('who want to play, looking for the opponent');
        var data = { opponent: 'petya'};

        io.clients((error, clients) => {
            if (error) throw error;
            console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
        });

        socket.emit('get-opponent', data);
    });
});