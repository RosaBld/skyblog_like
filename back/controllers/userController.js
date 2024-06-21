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
    res.send({ token });
  } else {
    res.json({ status: 'Unauthorized' });
  }
};