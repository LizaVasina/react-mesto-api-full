const process = require('process')
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { isURL } = require('validator');
const cors = require('cors');
const helmet = require('helmet');


const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/not-found');
const ValidationError = require('./errors/validation-error');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// const whiteList = ['http://domainname.mesto.nomoredomains.monster', 'https://domainname.mesto.nomoredomains.monster'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     }
//   },
//   credentials: true,
// };

//app.use(cors(corsOptions));

app.use(cors({
  origin: 'https://domainname.mesto.nomoredomains.monster',
  credentials: true,
}));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors({ origin: "http://domainname.mesto.nomoredomains.monster", credentials: true }));

app.use(requestLogger);



app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.custom((v) => {
      if (!isURL(v, { require_protocol: true })) {
        throw new ValidationError('Неверная ссылка на аватар');
      }

      return v;
    }, 'custom avatar validation'),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
