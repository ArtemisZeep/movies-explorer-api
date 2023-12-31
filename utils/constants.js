const GENERAL_ERROR = 500;
const BAD_REQUEST = 400;
const RESOURCE_NOT_FOUND = 404;
const OK_CREATED = 201;
const STATUS_ALREADY_EXISTS = 409;
const STATUS_OK_CREATED = 201;
const STATUS_OK = 200;
const STATUS_NOT_AUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const GENERAL_ERROR_MESSAGE = 'Произошла ошибка';
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const RESOURCE_NOT_FOUND_MESSAGE = 'Неверный URL';
const USER_NOT_FOUND_MESSAGE = 'Указанный польователь не найден';
const MOVIE_NOT_FOUND_MESSAGE = 'Указанная карточка не найдена';
const ALREADY_EXISTS_MESSAGE = 'Пользователь уже существует';
const USERS_NOT_FOUND_MESSAGE = 'Пользователи не найдены';
const MOVIES_NOT_FOUND_MESSAGE = 'Карточки не найдены';
const MOVIE_NOT_AUTHORIZED_DELETION_MESSAGE = 'Попытка удаления чужой карточки';
const SUCCESSFUL_AUTHORIZATION_MESSAGE = 'Успешная авторизация';
const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const JWT_TOKEN_EXPIRES = '7d';
const COOKIE_MAX_AGE = 3600000;
//  eslint-disable-next-line
const PATTERN = /http(s)?:\/\/(www\.)?[a-z0-9\.\-]+\/[a-z0-9\.\-_~:\/?#\[\]@!$&'()*+,;=]+/;

module.exports = {
  GENERAL_ERROR,
  GENERAL_ERROR_MESSAGE,
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  RESOURCE_NOT_FOUND,
  RESOURCE_NOT_FOUND_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  OK_CREATED,
  STATUS_ALREADY_EXISTS,
  STATUS_OK_CREATED,
  STATUS_OK,
  STATUS_NOT_AUTHORIZED,
  STATUS_FORBIDDEN,
  ALREADY_EXISTS_MESSAGE,
  USERS_NOT_FOUND_MESSAGE,
  MOVIES_NOT_FOUND_MESSAGE,
  MOVIE_NOT_AUTHORIZED_DELETION_MESSAGE,
  SUCCESSFUL_AUTHORIZATION_MESSAGE,
  SECRET_KEY,
  JWT_TOKEN_EXPIRES,
  COOKIE_MAX_AGE,
  PATTERN,
};
