const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.route('/')
  .get(getMovies)
  .post(
    celebrate({
      body: Joi.object().keys({
        nameEN: Joi.string().required(),
        nameRU: Joi.string().required(),
        movieId: Joi.string().required(),
        thumbnail: Joi.string().required(),
        trailerLink: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        year: Joi.string().required(),
        duration: Joi.string().required(),
        director: Joi.string().required(),
        country: Joi.string().required(),
      }),
    }),
    createMovie,
  );

router.route('/_id')
  .delete(
    celebrate({
      params: Joi.object().keys({
        movieId: Joi.string()
          .required()
          .length(24)
          .pattern(/[a-z][0-9]+/),
      }),
    }),
    deleteMovie,
  );

module.exports = router;
