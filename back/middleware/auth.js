require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Article = require('../models/Article');

async function auth(req, res, next) {
  const token = req.cookies.token;

  console.log('Token:', token);

  if (!token) {
    console.log('No token found, sending 401');
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWTKEY, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'Token verification failed' });
    }

    try {
      const userId = payload.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      req.userId = user._id;
      
      next();
    } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}

module.exports = auth;