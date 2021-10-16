'use strict';

const axios = require('axios');

async function getMovie(request, response){
  let { cityName } = request.query;
  console.log(request.query);
  // let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=Seattle`;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

  try {
    let movieResults = await axios.get(movieURL);

    const movieArray = movieResults.data.results.map(element => new Film(element));
    console.log(movieArray);
    response.status(200).send(movieArray);
  }
  catch (error){
    response.status(404).send('Unable to access movie data!');
  }
}


class Film {
  constructor(element) {
    this.title= element.title;
    this.overview= element.overview;
    this.averageVotes= element.vote_average;
    this.totalVotes= element.vote_count;
    this.imageURL= 'https://image.tmdb.org/t/p/original' + element.poster_path;
    this.popularity= element.popularity;
    this.releasedOn= element.release_date;
  }
}


module.exports = getMovie;
