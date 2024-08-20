const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/articles', articleController.newArticle);

module.exports = router;