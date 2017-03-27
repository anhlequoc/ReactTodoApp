var moment = require('moment');

console.log(moment().format());

// unix timestamp
// January 1st 1970 @ 12:00am -> 0
// January 1st 1970 @ 12:01am -> 60

var now = moment();
console.log('Current timestamp: ', now.unix());

var timestamp = 1490626777;
var currentMoment = moment.unix(timestamp);
console.log('Current moment: ', currentMoment.format('MMM D, YY @ h:mm a'));

// January 3rd, 2017 @ 12:13 AM
console.log('Current moment in other format: ', currentMoment.format('MMMM Do, YYYY @ hh:mm A'));
