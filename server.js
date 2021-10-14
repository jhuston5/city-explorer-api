'use strict';
//Boilerplate
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

// const request = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());





app.get('/', (request, response) => {
  response.status(200).send('Greetings from the server');
});



app.get('/weather', getWeather);


async function getWeather(request, response){

  // -- Current Date Function Goes Here -- //

  let { lat, lon} = request.query;
  console.log(request.query);
  let weatherURL = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=2021-10-10&end_date=2021-10-13&key=${process.env.WEATHER_API_KEY}`;



  try {
    let getWeather =  await axios.get(weatherURL);


    const weatherArray = getWeather.data.data.map(day => new Forecast(day));

    // console.log(getWeather.data);
    console.log(weatherArray);
    response.status(200).send(weatherArray);
    // response.status(200).send(weatherArray);

  }
  catch (error) {
    response.status(404).send('Unable to access weather data!');
  }
}




class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.min_temp}, high of ${day.max_temp}`;
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
