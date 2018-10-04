// 1 jan 1970 00:00:00 am
// in default the time in unix start from there, so the value 0(milliseconds) will be the date above

// the default Date object has very limited method so we will use a library called moment

var moment = require('moment');

var date = moment(); //this creates a new moment object that rappresents the current moment

date.add(1,'years').subtract(1,'months');
console.log(date.format('MMM Do YYYY')); // watch the docs for all the possibilities of this library

console.log(date.format('hh:mm a'));
