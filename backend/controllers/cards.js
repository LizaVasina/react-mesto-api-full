const Card = require('../models/card.js');

// errors
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation-error');
const NoRightsError = require('../errors/no-rights-error.js');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => { res.send(cards); })
    .catch((err) => { res.status(500).send({ message: err }); });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      }

      res.status(500).send({ message: err });
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Ресурс не найден'))
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        throw new Error('Cant delete');
      }

      return Card.findByIdAndDelete(req.params.cardId)
        .orFail(new NotFoundError('Ресурс не найден'))
        .then(() => {
          res.status(200).send({ message: 'Карточка успешно удалена' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'Cant delete') {
        next(new NoRightsError('Пользователь не может удалять чужие карточки'));
      }

      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные для удаления карточки'));
      }

      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Ресурс не найден'))
    .then(() => { res.send({ message: 'Поставили лайк' }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные для постановки лайка'));
      }

      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Ресурс не найден'))
    .then(() => { res.send({ message: 'Убрали лайк' }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные для снятия лайка'));
      }

      next(err);
    });
};
