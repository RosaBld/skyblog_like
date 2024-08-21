const Article = require('../models/Article');
const User = require('../models/Users');
const auth = require('../middleware/auth');

exports.newArticle = [
  auth,
  async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found in newArticle, sending 404');
        return res.status(404).json({ error: 'User not found' });
      }

      const article = new Article({
        title,
        content,
        user: userId
      });

      await article.save();
      res.status(201).json({ message: 'Article created successfully', article });
    } catch (error) {
      console.error('Error in newArticle:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

exports.userArticles = [
  auth,
  async (req, res) => {
    const userId = req.userId;
    console.log('userId from auth middleware:', userId);

    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found in userArticles, sending 404');
        return res.status(404).json({ error: 'User not found' });
      }

      const articles = await Article.find({ user: userId });
      console.log('Articles found:', articles);
      res.status(200).json({ articles });
    } catch (error) {
      console.error('Error in userArticles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];