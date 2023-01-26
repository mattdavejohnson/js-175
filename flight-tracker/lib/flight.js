const nextId = require('./next-id');

class Flight {
  constructor(airline, flightNumber, departureTime, arrivalTime, destination) {
    this.id = nextId();
    this.airline = airline;
    this.flightNumber = flightNumber;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.destination = destination;
  }
}

module.exports = Flight;
