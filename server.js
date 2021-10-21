'use strict';
//Boilerplate
require('dotenv').config();

let cache = require('./modules/cache.js');
const express = require('express');
const cors = require('cors');

// const request = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());





app.get('/', (request, response) => {
  response.status(200).send('Greetings from the server');
});


let handleWeather = require('./modules/weather.js');
let getMovie = require('./modules/movie.js');

app.get('/weather', handleWeather);
app.get('/movie', getMovie);





app.get('*', (request, response) => {
  response.status(404).send('That route does not exist.  Sorry. :(');
});


// Listen on the PORT for requests from the 
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));



