const Article = require('../models/Article');
const User = require('../models/Users');
const auth = require('../middleware/auth');

exports.newArticle = [
  auth,
  async (req, res) => {
    const { title, content } = req.body;

    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const article = new Article({
        title,
        content,
        user: req.userId
      });

      await article.save();
      res.status(201).json({ message: 'Article created successfully', article });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];