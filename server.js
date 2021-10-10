'use-strict';
//Boilerplate
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const request = require('express');
const weatherData = require('./data/weather.json');

const PORT = process.env.PORT || 3001;
const app = 'express';
app.use(cors());





app.get('/', (request, response) => {
  response.send('Greetings from the server');
});




class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}


app.get('/weather', getWeather);


function getWeather(request, response){

  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.cityName;
  let newWeatherArr = [];

  weatherData.find(element => {
    if (element.city_name === searchQuery){
      let date = element.data.map(day => day.datetime);
      let description = element.data.map(day => day.weather.description);
      newWeatherArr.push(new Forecast(date, description));
    }
  });
  if (newWeatherArr.length > 0) {
    response.status(200).send(newWeatherArr);
  }
  else {
    response.status(500).send('Error!');
  }

}













app.get('*', (request, response) => {
  response.status(404).send('That route does not exist.  Sorry. :(');
});



app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
