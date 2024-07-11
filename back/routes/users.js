const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/me', auth, async (req, res) => {
  const user = await user.findById(req.userId);
  res.send({ username: user.username });
})

module.exports = router;