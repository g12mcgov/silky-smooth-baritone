silky-smooth-baritone
=====================

A silky smooth chat client made with WebSockets and Node.js

This started out as a silly Node.js project that I made in order to learn
node. In particular, the draft code comes from the Smashing Node book, and
I grew the code from there to learn more about socket.io. However, we are
now using the chat internally in several clients, and I thought I could
display my Node foo, but also if folks wanted to improve it they could.

To run the server:

    $ node server

Then simply navigate to `http://localhost:3000/` to get to the chat. If you
have a Mac or MDNS installed you can use `http://myhost.local:3000/` to 
get other people to chat with you!

Continuing Development
----------------------

If anyone is interested in extending this chat project, here are a few
things we can do to really get it going, I know some clients who have
stuck it up internally and customized it heavily for dev groups to chat.

You know, if it doesn't take away from their other tasks. 

1. Enable some sort of chat history so newly logged in users can see chats.
2. Add colorization so that we can see who's who a bit better. 
3. Allow some basic HTML for links etc. (Or a regex to detect them automagically).
4. Create some authentication portal so we have unique names and identities
5. Allow cookies so that you don't have to constantly retype your name.
