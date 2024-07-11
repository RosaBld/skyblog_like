require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ status: 'Created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user._id }, 'JWTKEY', { expiresIn: '1h' });
    const username = req.body.username;
    res.send({ token, username });
  } else {
    res.json({ status: 'Unauthorized' });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId, 'username');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};