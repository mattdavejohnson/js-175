const express = require('express');
const morgan = require('morgan');

const Flight = require('./lib/flight');
const flightList = require('./lib/seed-data');

const app = express();
const host = 'localhost';
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const loadFlight = (flightId) => {
  return flightList.find((flight) => flight.id === flightId);
};

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('home', { flightList });
});

app.get('/add-flight', (req, res) => {
  res.render('add-flight');
});

app.get('/home/:flightId', (req, res) => {
  let { flightId } = req.params;
  let flight = loadFlight(+flightId);
  res.render('flight', { flight });
});

app.post('/home/new', (req, res) => {
  // let airline = req.body.airline;
  // let flightNumber = req.body.flightNumber;
  // let departureTime = req.body.departureTime;
  // let arrivalTime = req.body.arrivalTime;
  // let destination = req.body.destination;

  let { airline, flightNumber, departureTime, arrivalTime, destination } =
    req.body;

  flightList.push(
    new Flight(airline, flightNumber, departureTime, arrivalTime, destination)
  );

  res.redirect('/home');
});

app.listen(port, host, () => {
  console.log(`Flight Tracker is listening on port ${port} of ${host}`);
});
