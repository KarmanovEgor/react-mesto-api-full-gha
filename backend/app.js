require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');

const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,

});
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {

});
