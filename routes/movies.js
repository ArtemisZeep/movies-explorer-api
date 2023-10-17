const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

router.route('/')
  .get(getMovies)
  .post(
    celebrate({
      body: Joi.object().keys({
        nameEN: Joi.string().required(),
        nameRU: Joi.string().required(),
        movieId: Joi.number().required(),
        thumbnail: Joi.string().required().regex(url),
        trailerLink: Joi.string().required().regex(url),
        image: Joi.string().required().regex(url),
        description: Joi.string().required(),
        year: Joi.string().required(),
        duration: Joi.number().required(),
        director: Joi.string().required(),
        country: Joi.string().required(),
      }),
    }),
    createMovie,
  );

router.route('/:movieId')
  .delete(
    celebrate({
      params: Joi.object().keys({
        movieId: Joi.string()
          .hex()
          .length(24)
          .required(),
      }),
    }),
    deleteMovie,
  );

module.exports = router;
