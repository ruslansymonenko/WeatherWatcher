const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'));

app.get('/weather', (req, res) => {
  const API_KEY = process.env.API_KEY;

  fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Kiev&aqi=no`)
    .then(response => response.json())
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred while fetching data from the external API');
    });
});

app.listen(3000, () => {
  console.log('Server is working...');
})