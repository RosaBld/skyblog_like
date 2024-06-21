require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'JWTKEY', (err, payload) => {
    if (err) return res.sendStatus(401);
    req.userId = payload.userId;
    next();
  });
}

module.exports = auth;