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

//socket.emit('createMessage', {
//  to : 'server@email.com',
//  text : 'Ciao, sono swag'
//});
