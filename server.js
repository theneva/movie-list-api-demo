const db = require('mongoose');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(bodyParser.json());

const dbName = 'beeccyjewiojadioasdioasjiodas';
db.connect(
  'mongodb://localhost/' + dbName,
  { useMongoClient: true },
  () => console.log('connected to db', dbName)
);

const Movie = db.model('Movie', {
  title: { type: String, required: true },
  year: { type: Number, required: false },
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/movies', async (req, res) => {
  const newMovie = new Movie(req.body);
  const savedMovie = await newMovie.save();
  res.json(savedMovie);
});

async function getMovies() {
  const movies = await Movie.find();
  return movies;
}

app.get('/movies', async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

app.get('/movie-titles', async (req, res) => {
  const movies = await getMovies();
  const movieTitles = movies.map(movie => movie.title);
  res.send(movieTitles);
});

app.listen(1234, () => console.log('listening on port 1234'));
