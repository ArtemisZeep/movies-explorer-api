require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { handleAllErrors } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const corsHandler = require('./middlewares/corsHandler');

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/moviedb',
} = process.env;

const app = express();

mongoose.connect(MONGODB_URL, {
  autoIndex: true,
});

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger); // логгер реквестов
app.use(corsHandler);

app.use(router);

// Error Handling Middleware
app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки валидации celebrate
app.use(handleAllErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
