const path = require('path'); // this modules is already installed with node js and it resolve the paths of folders (watch the examples)
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const publicPath = path.join(__dirname, '/../public');
//console.log(__dirname+'/../public'); // example
//console.log(publicPath);            // example
var port = 3000 || process.env.PORT;
var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require('./utils/message.js');

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('messageAdmin',generateMessage('Admin', 'Welcome to the chat'));

  socket.broadcast.emit('newUser',generateMessage('Admin', 'New user joined'));

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  //socket.emit('newMessage', {
  //  from : 'server@email.com',
  //  text : 'Puzzi',
  //  createAt : 123
  //});

  socket.on('createMessage', (newMessage, callback) => {
    //console.log('Create Message', newMessage);

    //io.emit('newMessage', {   //this emit take all the messages from clients and send it back to everyone(even the one who sent it)
    //  from : newMessage.from,
    //  text : newMessage.text,
    //  createdAt : new Date().getTime()
    //});

    socket.broadcast.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
    console.log(`I sent a message from ${newMessage.from} to the other windows`);

    callback('I have receiced the message, thanks');
  });
});





server.listen(port, () => {
  console.log('Server Listening on port '+ port);
});
