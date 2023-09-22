require('dotenv').config();

console.log(process.env.NODE_ENV);
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const invalidRoutes = require('./routes/invalidURLs');
const { handleAllErrors } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/moviedb',
} = process.env;

const {
  createUser,
  login,
  logout,
} = require('./controllers/users');

const app = express();

mongoose.connect(MONGODB_URL, {
  autoIndex: true,
});

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger); // логгер реквестов

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
app.use('/users', auth, userRoutes);
app.use('/movies', auth, movieRoutes);
app.get('/signout', auth, logout);

app.use('*', invalidRoutes);

// Error Handling Middleware
app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки валидации celebrate
app.use(handleAllErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
