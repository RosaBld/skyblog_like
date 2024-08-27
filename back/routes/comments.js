const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/addComment', commentController.addComment);
router.post('/comments', commentController.showComment);

module.exports = router;