const Flight = require('./flight');

let flightOne = new Flight(
  'American Airlines',
  1234,
  '9:30am',
  '3:30pm',
  'San Diego'
);
let flightTwo = new Flight(
  'Southwest',
  2143,
  '11:30am',
  '4:30pm',
  'Los Angeles'
);

let flights = [flightOne, flightTwo];

module.exports = flights;
