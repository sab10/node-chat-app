const expect = require('expect');
const {Users} = require('./users.js');



describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id : '1',
      name : 'Sabin',
      room : 'Cool room',
    },  {
      id : '2',
      name : 'Swag',
      room : 'Cool room',
    }, {
      id : '3',
      name : 'Sfigato',
      room : 'Sfigato room',
    }];

  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id : '1234',
      name : 'Sabin',
      room : 'Cool Room'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for Cool room', () => {
    var userList = users.getUserList('Cool room');

    expect(userList).toEqual(['Sabin', 'Swag']);
  });

  it('should return names for Sfigato room', () => {
    var userList = users.getUserList('Sfigato room');

    expect(userList).toEqual(['Sfigato']);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).toBeUndefined();
  });
});
