/**
 * Client chat controller.
 */

$(function() {

    // Global Variables.
    var socket   = io.connect();
    var msgInput = $('#msgInput');
    var chatForm = $('#chatForm');

    // Socket Handlers
    socket.on('connect', function() {
        // Send a join event with your name.
        socket.emit('join', prompt('What is your nickname?'));

        // Show the chat
        $('#chat').toggle();
    });

    socket.on('announcement', function(msg) {
        var li = $('<li></li>');
        li.addClass('announcement');
        li.html(msg);
        $('#messages').append(li);
    });

    socket.on('text', addMessage);

    // Utility Functions
    function addMessage(from, text) {
        var li = $('<li></li>');
        li.addClass('message');
        li.html('<strong>' + from  + '</strong>: ' + text);
        $('#messages').append(li);
    }

    // Event Handlers
    chatForm.submit(function(event) {
        event.preventDefault();
        var msg = msgInput.val();
        addMessage('me', msg);
        socket.emit('text', msg);

        msgInput.val('');
        msgInput.focus();
        return false;
    });

});