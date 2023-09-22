const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const {
  BAD_REQUEST_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  STATUS_OK_CREATED,
  ALREADY_EXISTS_MESSAGE,
  JWT_TOKEN_EXPIRES,
} = require('../utils/constants');

const {
  NotFoundError,
  BadRequestError,
  UserAlreadyExistsError,
} = require('../errors/errors');

async function getUserById(req, res, next) {
  const userId = req.params.userId || req.user._id;

  try {
    const user = await User.findById(userId).orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    });
    res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE));
    } else {
      next(error);
    }
  }
}

async function updateUser(req, res, next) {
  const { email, name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user._id, { email, name }, {
      new: true,
      runValidators: true,
    }).orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    });
    res.send(user);
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE));
    } else {
      next(error);
    }
  }
}

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash, // записываем хеш в базу
      name,
    }))
    .then((user) => res.status(STATUS_OK_CREATED).send({ data: user }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new UserAlreadyExistsError(ALREADY_EXISTS_MESSAGE));
        return;
      }
      if (error.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_TOKEN_EXPIRES });
      res.cookie('jwt', token, {
      // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true, // указали браузеру посылать куки, только если запрос с того же домена
      })
      // отправим токен пользователю
        .send({ message: 'Успешная авторизация' });
    })
    .catch((err) => next(err));
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из системы' });
};

module.exports = {
  getUserById,
  updateUser,
  createUser,
  login,
  logout,
};
