const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'mesto' } = process.env;
const UnautorizationError = require('../errors/UnautorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizationError('Авторизуйся, бро');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnautorizationError('Авторизуйся, бро');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
