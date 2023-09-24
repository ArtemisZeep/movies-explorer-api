const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById,
  updateUser,
} = require('../controllers/users');

// Маршрут для получения текущего пользователя
router.get('/me', getUserById);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser,
);

module.exports = router;
