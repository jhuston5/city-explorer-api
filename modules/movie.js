'use strict';

const axios = require('axios');

let cache = require('./cache.js');

async function getMovie(request, response){

  // Use the city name as query parameter
  let { cityName } = request.query;
  console.log(request.query);
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

  // Set cache to return local memory if within the specified time limit
  if(cache[cityName] && Date.now() - cache[cityName].timestamp < 1000 * 60 * 2){
    // Send cached movie data to front end
    response.status(200).send(cache[cityName].movie);
    console.log(cache, 'Cache Hit!');
  }

  else {
  // Try --> Axios request to call Movie API
    try {
      let movieResults = await axios.get(movieURL);

      // Iterate through Movie Data and use Film class to aggregate data
      const movieArray = movieResults.data.results.map(movie => new Film(movie));
      console.log(movieArray);
      // Set the cache during the first API call
      cache[cityName] = {
        movie: movieArray,
        timestamp: Date.now()
      };
      console.log('cache miss');

      // Send movieArray data to front-end
      response.status(200).send(movieArray);
    }

    catch (error){
      response.status(404).send('Unable to access movie data!');
    }
  }
}

// Film class bringing in movieResults data to display title, overview, votes, release date, and image
class Film {
  constructor(movie) {
    this.title= movie.title;
    this.overview= movie.overview;
    this.averageVotes= movie.vote_average;
    this.totalVotes= movie.vote_count;
    this.imageURL= 'https://image.tmdb.org/t/p/original' + movie.poster_path;
    this.popularity= movie.popularity;
    this.releasedOn= movie.release_date;
  }
}


module.exports = getMovie;
