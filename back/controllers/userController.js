require('dotenv').config();
const bcrypt = require('bcryptjs');
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
  try {
    console.log('JWTKEY:', process.env.JWTKEY);

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ status: 'Unauthorized' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ status: 'Unauthorized' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWTKEY, { expiresIn: '1h' });
    const username = req.body.username;
    console.log('Generated Token:', token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'Strict'
    });

    res.status(200).json({ message: 'Login successful', token, username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUsername = async (req, res) => {
  const { newUsername } = req.body;

  try {
    await User.findByIdAndUpdate(req.userId, { username: newUsername });
    const token = jwt.sign({ userId: req.userId, username: newUsername }, process.env.JWTKEY, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'Strict', 
    });
    
    res.status(200).json({ message: 'Username updated successfully', username: newUsername });
  } catch (error) {
    console.error('Error updating username', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.updatePassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.userId, { password: hashedPassword });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId, 'username');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};