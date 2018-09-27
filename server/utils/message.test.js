var expect = require('expect');
var {generateMessage} = require('./message.js');

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
