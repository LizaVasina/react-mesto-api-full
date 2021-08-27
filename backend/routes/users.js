const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const ValidationError = require('../errors/validation-error');

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.custom((v) => {
      if (!isURL(v, { require_protocol: true })) {
        throw new ValidationError('Неверная ссылка на аватар');
      }

      return v;
    }, 'custom avatar validation'),
  }),
}), updateUserAvatar);

usersRouter.get('/me', getCurrentUser);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), getUserById);

module.exports = usersRouter;
