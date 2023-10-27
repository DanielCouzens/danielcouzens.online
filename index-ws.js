const express = require('express');
const server = require('http').createServer();
const app = express();
const PORT = 3000;

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);

server.listen(PORT, function () { console.log('Listening on ' + PORT); });

/** Websocket **/

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});

wss.on('connection', function connection(ws) {
	const numClients = wss.clients.size;

	console.log('Clients connected', numClients);

	wss.broadcast(`Current visitors ${numbClients}`);

	if (ws.readyState === ws.OPEN) { 
		ws.send('Welcome to my server');
	}

	ws.on('close', function close() {
		console.log('A client has disconnected');
	});

	ws.on('error', function error() {
		console.log('error with websocket');	
	}}
});

wss.broadcast = function broadcast(data) {
	console.log('Broadcasting: ', data);
	wss.clients.forEach(function each(client) {
		client.send(data);
	});
}
