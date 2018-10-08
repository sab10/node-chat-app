const expect = require('expect');
const {isRealString} = require('./validation.js');
// import isRealString



describe('String controls', () => {


  it('Should reject non string values', () => {
      expect(isRealString(4,5)).toBe(false);
  });

  it('Should reject string with only spaces', () => {
      expect(isRealString('   ', '    ')).toBe(false);
  });

  it('Should allow string with non space characters', () => {
      var name = 'Sab';
      var room = 'Developers';
      expect(isRealString(name,room)).toBe(true);
  });


});
