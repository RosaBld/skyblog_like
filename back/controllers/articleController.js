const Article = require('../models/Article');
const User = require('../models/Users');
const auth = require('../middleware/auth');

exports.newArticle = [
  auth,
  async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId;

    try {
      const user = await User.findById(req.userId);
      if (!user) {
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
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

exports.userArticles = [
  auth,
  async(req, res) => {
    const userId = req.userId;

    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const articles = await Article.find({ user: userId });
      res.status(200).json({ articles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal servor error' });
    }
  }
];