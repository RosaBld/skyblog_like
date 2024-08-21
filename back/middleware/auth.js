require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

async function auth(req, res, next) {
  const token = req.cookies.token;

  console.log('Token:', token);

  if (!token) {
    console.log('No token found, sending 401');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWTKEY, async (err, payload) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(401);
    }
    console.log('Token verified, payload:', payload);

    try {
      const user = await User.findOne({ username: payload.username });
      if (!user) {
        return res.sendStatus(401);
      }
      req.userId = user._id;
      next();
    } catch (error) {
      console.error('Error finding user:', error);
      res.sendStatus(500);
    }
  });
}

module.exports = auth;