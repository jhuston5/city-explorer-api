'use-strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const app = 'express';

app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Listening on Port:', PORT));

app.get('/', (request, response) => {
  response.send('Greetings from the server');
});

app.get('*', (request, response) => {
  response.status(404).send('That route does not exist.  Sorry. :(');
});
