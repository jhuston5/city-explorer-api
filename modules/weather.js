'use strict';

const axios = require('axios');

async function handleWeather(request, response){


  // Set query parameters equal to latitude and longitude 
  let { lat, lon} = request.query;
  console.log(request.query);
  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=3&key=${process.env.WEATHER_API_KEY}`;


  try {
    // Request JSON data from Weatherbit API
    let getWeather =  await axios.get(weatherURL);


    const weatherArray = getWeather.data.data.map(day => new Forecast(day));

    console.log(weatherArray);
    response.status(200).send(weatherArray);

  }
  catch (error) {
    response.status(404).send('Unable to access weather data!');
  }
}


class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.min_temp}, high of ${day.max_temp}`;
  }
}

module.exports = handleWeather;
