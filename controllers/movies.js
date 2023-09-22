const Movie = require('../models/movie');
const {
  RESOURCE_NOT_FOUND,
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  OK_CREATED,
  STATUS_OK,
  MOVIE_NOT_AUTHORIZED_DELETION_MESSAGE,
} = require('../utils/constants');
const {
  BadRequestError,
  ForbiddenError,
} = require('../errors/errors');

async function getMovies(req, res, next) {
  const currentUser = req.user;
  try {
    const movies = await Movie.find({ owner: currentUser._id }).populate(['owner', 'likes']);
    res.send(movies);
  } catch (error) {
    next(error);
  }
}

async function createMovie(req, res, next) {
  const {
    nameRU,
    nameEN,
    thumbnail,
    trailerLink,
    image,
    description,
    year,
    duration,
    director,
    country,
    movieId,
  } = req.body;
  try {
    const movie = await Movie.create({
      nameRU,
      nameEN,
      thumbnail,
      trailerLink,
      image,
      description,
      year,
      duration,
      director,
      country,
      owner: req.user._id,
      movieId,
    });
    const mvie = await Movie.findById(movie._id).populate(['owner']);
    res.status(OK_CREATED).send(mvie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
    } else {
      next(error);
    }
  }
}

async function deleteMovie(req, res, next) {
  try {
    const movie = await Movie.findById(req.params.MOVIEId).orFail(() => {
      const error = new Error(MOVIE_NOT_FOUND_MESSAGE);
      error.name = 'ResourceNotFound';
      error.statusCode = RESOURCE_NOT_FOUND;
      throw error;
    });

    if (req.user._id === movie.owner._id.toString()) {
      const deletedMovie = await Movie.findByIdAndRemove(req.params.MOVIEId);
      res.status(STATUS_OK).send(deletedMovie);
    } else {
      throw new ForbiddenError(MOVIE_NOT_AUTHORIZED_DELETION_MESSAGE);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE));
    } else {
      next(error);
    }
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
