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
var count = 0;

/**
 * App Configuration
 */

app.use(express.bodyParser());
app.use(express.static('htdocs'));

/**
 * Socket Handlers
 */

io.sockets.on('connection', function(socket) {

    // User Joining
    socket.on('join', function(name) {
        count++;
        socket.set('nickname', name, function() {
            socket.broadcast.emit('announcement', name + ' joined the chat.');
            socket.broadcast.emit('user_connected', {nickname: name, count: count});
            for (var sid in io.sockets.sockets) {
                io.sockets.sockets[sid].get('nickname', function(err, name) {
                    socket.emit('user_connected', {nickname: name, count: count});
                });
            }
        });
    });

    // User Disconnecting
    socket.on('disconnect', function() {
        count--;
        socket.get('nickname', function(err, name) {
            socket.broadcast.emit('announcement', name + ' left the chat.');
            io.sockets.emit('user_disconnected', {nickname: name, count:count});
        });
    });

    // Messages
    socket.on('text', function(msg) {
        socket.get('nickname', function(err, name) {
            msg = escape_tags(msg);
            socket.broadcast.emit('text', {nickname: name, message: msg});
        });
    });


});

/** 
 * Utility Functions
 */

function escape_tags(str) {
    // Question- does this add too much overhead?
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Listen
 */
server.listen(3000);