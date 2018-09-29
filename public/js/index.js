
var socket = io();


socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('messageAdmin', function (message) {
  console.log(message);
});

socket.on('newUser', function (message){
  console.log(message.text);
});

//socket.emit('createMessage', {
//  to : 'server@email.com',
//  text : 'Ciao, sono swag'
//});

//socket.emit('createMessage',{
//  from : 'tab cool',
//  text : 'Hi man'
//}, function (data) {
//  console.log(data);
//});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); // thie method prevents defaults events of the forms, like the refresh of the page(that we want to avoid)

  socket.emit('createMessage', {
    from : 'User',
    text : jQuery('[name=message]').val()
  }, function () {

  });
});       // the # is used when we are calling a ID
