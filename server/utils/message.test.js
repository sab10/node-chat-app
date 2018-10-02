var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('Generate Message', () => {
  it('should generate the correct message object', () => {
    var from = 'me';
    var text = 'this message';
    var message = generateMessage(from, text);

    // the expect library have changed all the function names so I have read the doc and used the new one
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from : from,
      text : text
    });
  });
});

describe('Generate Geolocation Message', () => {
  it('should generate the correct geolocation message object', () => {
    var from = 'me';
    var latitude = '45.0992';
    var longitude = '7.65063';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from : from,
      url : `https://www.google.com/maps?q=${latitude},${longitude}`
    });
  })
});
