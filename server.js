
var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

var sockjs = require('sockjs');
var SockServerInstance = sockjs.createServer();

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);
var singleData = null;

console.log('http server listening on %d', port);


var wss = new WebSocketServer({server: server});
wss.broadcast = function(data) {
    for(var i in this.clients)
        this.clients[i].send(data);
};
console.log('websocket server created');

wss.on('connection', function(ws) {
		var result  = {
		date: new Date(),
		pie: "apple pie is good"
	}

    //WARNING COMMENT THE BELOW ITEM OUT
    /*
    var id = setInterval(function() {
        ws.send(JSON.stringify({ date: new Date(), pie: "apple pie is good"}), function() {  });
    }, 1000);
    */

    
    app.get('/', function(req, res) {
      /*
      new_son = {
      recipe_id : recArray, 
      recipe_name: recnameArray, 
      smallImageUrls:siuArray, 
      details: dArray,
      ingredient_list: ilArray
      };
      
      var format_son = JSON.stringify(new_son);
      res.write(format_son);
      */
      res.writeHead(200);
      console.log('websocket connection open');
    
      ws.on('message', function(data,flags) {
          var result2  = {
          text: data,
          }
          //ws.send(JSON.stringify(result2));
          //console.log('received: %s', data);
          console.log('type of data: %s',data.type);
          if (data!=null){
            singleData = data;
          }
          wss.broadcast(data);
      });

      ws.on('close', function() {
          console.log('websocket connection close');
          //clearInterval(id);
      });
      ws.on('error', function(reason, code) {
        console.log('socket error: reason ' + reason + ', code ' + code);
      });
      res.end(singleData);
      //wss.broadcast(singleData);
    });
    app.get('/paint', function(req, res) {
        /*
        new_son = {
        recipe_id : recArray, 
        recipe_name: recnameArray, 
        smallImageUrls:siuArray, 
        details: dArray,
        ingredient_list: ilArray
        };
        
        var format_son = JSON.stringify(new_son);
        res.write(format_son);
        */
        res.writeHead(200);
        //res.write('<html><body>');
        //res.write('THE NEW RESPONSE PAGE');
        //res.write(singleData);
        //res.end('</body></html>');
        res.end(singleData);
        //wss.broadcast(singleData);
    });

    
});



//USING SOCK JS
/*
var http = require('http'),
    sockjs = require('sockjs'),
    warble = sockjs.createServer(),
    connections = [];
var port = process.env.PORT || 5000;

warble.on('connection', function(conn) {
  console.log('Got connection');
  connections.push(conn);
  conn.on('data', function(message) {
    console.log('Got data: ' + message);
    // write the message to all connected clients
    for (var i=0; i<connections.length; i++) {
      connections[i].write(message);
    }
  });
  conn.on('close', function() {
    connections.splice(connections.indexOf(conn), 1); // remove the connection
    console.log('Lost connection');
  });
});

var server = http.createServer();
//warble.installHandlers(server, {prefix:'/warble'});
//warble.installHandlers(server, {prefix:''});
warble.installHandlers(server);
console.log("port is "+port)
server.listen(port);
*/