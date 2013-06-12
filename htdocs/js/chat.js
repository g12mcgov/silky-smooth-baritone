/**
 * Client chat controller.
 */

$(function() {

    // Global Variables.
    var socket   = io.connect();
    var msgInput = $('#msgInput');
    var chatForm = $('#chatForm');
    var nickname;

    // Socket Handlers
    socket.on('connect', function() {

        function getNickname() {
            nickname = prompt('Enter a chat name:');
            if (!nickname) {
                nickname = getNickname();
            }
            return nickname;
        }

        // Send a join event with your name.
        socket.emit('join', getNickname());

        // Show the chat
        $('#content').toggleClass('hide');
    });

    socket.on('announcement', function(msg) {
        var li = $('<li></li>');
        li.addClass('announcement');
        li.html(msg);
        $('#messages').append(li);
    });

    socket.on('text', addMessage);

    socket.on('user_connected', function(data) {
        var li = $('<li></li>');
        li.addClass('user');
        li.attr('id', data.nickname);
        li.html(data.nickname);
        $('#users').append(li);
        $('#user_count').text(data.count);
    });

    socket.on('user_disconnected', function(data) {
        $('#' + data.nickname).remove();
        $('#user_count').text(data.count);
    });

    // Utility Functions
    function addMessage(data) {
        var li = $('<li></li>');
        li.addClass('message');
        li.html('<strong>' + data.nickname  + '</strong>: ' + data.message);
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