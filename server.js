var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);
var result  = {
	date: new Date(),
	pie: "apple pie is good"
}

var wss = new WebSocketServer({server: server});
console.log('websocket server created');
wss.on('connection', function(ws) {
    var id = setInterval(function() {
        ws.send(JSON.stringify(result), function() {  });
    }, 1000);

    console.log('websocket connection open');

    ws.on('close', function() {
        console.log('websocket connection close');
        clearInterval(id);
    });
});