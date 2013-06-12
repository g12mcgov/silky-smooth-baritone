/**
 * Client chat controller.
 */

$(function() {

    // Global Variables.
    var socket   = io.connect();
    var msgInput = $('#msgInput');
    var chatForm = $('#chatForm');
    var messageList = $('#messages');
    var userList    = $('#users');
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
        $('.hideblock').fadeOut('slow');

        // Finally, set chat bar to focus:
        msgInput.focus();
    });

    socket.on('announcement', function(msg) {
        addMessage(msg, 'announcement');
    });

    socket.on('text', addChat);
    socket.on('user_connected', addUser);

    socket.on('user_disconnected', function(data) {
        $('#' + data.nickname).remove();
        $('#user_count').text(data.count);
    });

    // Utility Functions
    function addMessage(messageHtml, messageClass) {
        messageClass = messageClass || 'chat-message';
        var li = $('<li></li>');
        li.addClass(messageClass);
        li.html(messageHtml);
        messageList.append(li);

        // Ensure that autoscrolling is ocurring
        messageList.scrollTop(messageList[0].scrollHeight);
    }

    function addChat(data) {
        var msg = "<strong>" + data.nickname + '</strong>: ' + data.message;
        addMessage(msg);
    }

    function addUser(data) {
        var li = $('<li></li>');
        li.addClass('user');
        li.attr('id', data.nickname);
        li.html('<i class="icon-user"></i> '+ data.nickname);
        userList.append(li);
        $('#user_count').text(data.count);
    }

    // Event Handlers
    chatForm.submit(function(event) {
        event.preventDefault();
        var msg = msgInput.val();
        addChat({nickname:'me', message: msg});
        socket.emit('text', msg);

        msgInput.val('');
        msgInput.focus();
        return false;
    });

});