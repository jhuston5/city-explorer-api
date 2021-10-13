'use strict';
//Boilerplate
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const request = require('express');
const weather = require('./data/weather.json');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());





app.get('/', (request, response) => {
  response.status(200).send('Greetings from the server');
});







app.get('/weather', getWeather);


function getWeather(request, response){


  let { lat, lon, searchQuery } = request.query;

  let foundCity = weather.find(element => element.city_name === searchQuery);


  try {
    const weatherArray = foundCity.data.map(day => new Forecast(day));

    response.status(200).send(weatherArray);
  }
  catch (error) {
    response.status(404).send('Unable to locate this city!');
  }
}




class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
  }
}






app.get('*', (request, response) => {
  response.status(404).send('That route does not exist.  Sorry. :(');
});


// Listen on the PORT for requests from the 
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));






// Previous Code


//   weatherData.find(element => {
//     if (element.city_name.toLowerCase() === searchQuery.toLowerCase()){
//       let date = element.data.map(day => day.datetime);
//       let description = element.data.map(day => day.weather.description);
//       newWeatherArr.push(new Forecast(date, description));
//     }
//   });
//   if (newWeatherArr.length > 0) {
//     response.status(200).send(newWeatherArr);
//   }
//   else {
//     response.status(500).send('Error!');
//   }

// }
