var socket = io();

socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
});

socket.on('messageAdmin', function (message) {
  console.log(`Message from admin: ${message.text}`);
});

socket.on('newUser', function (message){
  console.log(message.text);
});

//socket.emit('createMessage', {
//  to : 'server@email.com',
//  text : 'Ciao, sono swag'
//});
