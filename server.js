
var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

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

    console.log('websocket connection open');
    
    ws.on('message', function(data,flags) {
        var result2  = {
        text: data,
        }
        //ws.send(JSON.stringify(result2));
        //console.log('received: %s', data);
        console.log('type of data: %s',data.type);
        wss.broadcast(data);
    });

    ws.on('close', function() {
        console.log('websocket connection close');
        //clearInterval(id);
    });
app.get('/', function(req, res) {
  res.writeHead(200);
    res.write('<html><body>');
    res.write('<form action="users/login" method="post">Username <input type="text" name="user"><br>Password <input type="text" name="password"><input type="submit" value="Login" onclick=this.form.action="users/login"><input type="submit" value="add" onclick=this.form.action="users/signup"></form>');
    res.write('<form action="recipes/history" method="get"><input type="text" name="username">History Get Button <input type="submit" value="getHistory"></form>');
    res.write('<form action="yummly" method="post">Recipie Name <input type="text" name="q"><input type="submit" value="TestSearch" onclick=this.form.action="recipes/search"></form>');
    res.write('<form action="recipes/deleteAllHistory" method="post"><input type="text" name="username">Clear History<input type="submit" value="delete all history post Button"></form>');
    res.write('<form action="recipes/make" method="post">Username:<input type="text" name="user">RecipeName:<input type="text" name="recipe_name">Datecreated<input type="text" name="current_date">Rating:<input type="text" name="rating">Make <input type="submit" value="Make"></form>');
    res.write('<form action="recipes/getRecipeData" method="post">Recipe ID:<input type="text" name="recipe_id"><input type="submit" value="GetRecipeData"></form>');
    res.write('<form action="TESTAPI/resetFixture" method="post"><input type="text" name="username">RESET API <input type="submit" value="RESETTABLES"></form>');
    res.write('<form action="users/changePassword" method="post">Username <input type="text" name="user"><br>Password <input type="text" name="password"><br>newPassword<input type="text" name="newPassword"><input type="submit" value="Change" onclick=this.form.action="users/changePassword"></form>');
    res.end('</body></html>');
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