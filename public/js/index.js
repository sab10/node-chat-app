
var socket = io();


socket.on('connect', function () {
  console.log('Connected to the server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
  var formattedTime = moment(message.createAt).format('hh:mm a');

  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  console.log('New Message', message);
  var formattedTime = moment(message.createAt).format('hh:mm a');

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">Watch My Location</a>')
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

//socket.on('messageAdmin', function (message) {
//  console.log(message);
//});

//socket.on('newUser', function (message){
//  console.log(message.text);
//});

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
  e.preventDefault(); // this method prevents defaults events of the forms, like the refresh of the page(that we want to avoid)

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from : 'User',
    text : messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});       // the # is used when we are calling a ID

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage' , {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
    locationButton.removeAttr('disabled').text('Send location');
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch position');
  });
});
