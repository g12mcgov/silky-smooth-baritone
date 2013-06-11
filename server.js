/**
 * Dependencies
 */

var express = require('express');
var http    = require('http');
var sockio  = require('socket.io');

/**
 * Create Servers
 */

var app = express();
var server = http.createServer(app);
var io = sockio.listen(server);

/**
 * App Configuration
 */

app.use(express.bodyParser());
app.use(express.static('htdocs'));

/**
 * Socket Handlers
 */

io.sockets.on('connection', function(socket) {

    // Chat Joining
    socket.on('join', function(name) {
        socket.nickname = name;
        socket.broadcast.emit('announcement', name + ' joined the chat.');
    });

    // Messages
    socket.on('text', function(msg) {
        socket.broadcast.emit('text', socket.nickname, msg);
    });

});

/**
 * Listen
 */
server.listen(3000);