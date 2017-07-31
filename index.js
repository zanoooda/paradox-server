var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Paradox server 004\n");
});

server.listen(process.env.PORT);
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    console.log('who connected');

    socket.on('play', function (data) {
        //
        console.log(socket.id.toString() + ' want to play, looking for the opponent');

        socket.isOnline = true;
        socket.isPlaying = false;

        io.clients((error, clients) => {
            if (error) throw error;
            //console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
            clients.forEach(function(element) {
                console.log(element.id, element.isOnline, element.isPlaying)
            }, this);
        });

        // io.clients((error, clients) => {
        //     if (error) throw error;
        //     console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
        // });
        
        var data = { opponent: 'petya'};
        socket.emit('get-opponent', data);
    });
});