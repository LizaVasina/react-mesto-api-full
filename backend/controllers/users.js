const process = require('process')
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { NODE_ENV, JWT_SECRET } = process.env;

// errors
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation-error');
const UniqueValueError = require('../errors/unique-value-error');
const InvalidTokenError = require('../errors/invalid-token.js');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key', { expiresIn: '7d' });

      return res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
          secure: true,
        })
        .status(200).send({ userToken: token });
    })
    .catch(() => {
      next(new InvalidTokenError('Ошибка авторизации'));
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => { res.send(users); })
    .catch((err) => { res.status(500).send({ message: err }); });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Ресурс не найден'))
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные при поиске пользователя'));
      }

      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      const user = User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });

      return user;
    })
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      }

      if (err.name === 'MongoError' && err.code === 11000) {
        next(new UniqueValueError('Пользователь с такой почтой уже существует'));
      }

      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { name, about }, {
    runValidators: true,
    new: true,
  })
    .orFail(new NotFoundError('Ресурс не найден'))
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении пользователя'));
      }

      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { avatar }, {
    runValidators: true,
    new: true,
  })
    .orFail(new NotFoundError('Ресурс не найден'))
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара'));
      }

      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(new NotFoundError('Ресурс не найден'))
    .then((user) => { res.send({ currentUser: user }); })
    .catch(next);
};
