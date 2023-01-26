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

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/add-flight', (req, res) => {
  res.render('add-flight');
});

app.listen(port, host, () => {
  console.log(`Flight Tracker is listening on port ${port} of ${host}`);
});
