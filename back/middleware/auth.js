require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.cookies.token;

  console.log('Token:', token);


  if (!token) {
    console.log('No token found, sending 401');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWTKEY, (err, payload) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(401);
    }
    console.log('Token verified, payload:', payload);
    req.userId = payload.userId;
    next();
  });
}

module.exports = auth;