const path = require('path'); // this modules is already installed with node js and it resolve the paths of folders (watch the examples)
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '/../public');
//console.log(__dirname+'/../public'); // example
//console.log(publicPath);            // example
var port = 3000 || process.env.PORT;
var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

var {generateMessage, generateLocationMessage} = require('./utils/message.js');

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
       return callback('Name and room name required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined the room` ));

    callback();
  });

  socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat'));

  //socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));


  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
    }
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

    //socket.broadcast.emit('newMessage',generateMessage(newMessage.from,newMessage.text)); // I will use io .emit because we want to read in the chat the message we have sent
    var user = users.getUser(socket.id);
    if(user && isRealString(newMessage.text)) {
          io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }

    //console.log(`I sent a message from ${newMessage.from} to the other windows`);

    callback('I have receiced the message, thanks');
  });

  socket.on('createLocationMessage' , (coords) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
    }
  });
});





server.listen(port, () => {
  console.log('Server Listening on port '+ port);
});
