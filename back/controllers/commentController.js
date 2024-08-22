const Comment = require('../models/Comment');
const Article = require('../models/Article');
const User = require('../models/Users');
const auth = require('../middleware/auth');

exports.addComment = [
  auth,
  async (req, res) => {
    const { title, content } = req.body;
    const articleId = req.articleId;
    const userId = req.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found in newArticle, sending 404');
        return res.status(404).json({ error: 'User not found' });
      }

      const article = await Article.findById(articleId);
      if (!article) {
        console.log('Article not found, sending 404');
        return res.status(404).json({ error: 'Article not found' });
      }

      const comment = new Comment({
        title,
        content,
        user: userId,
        article: articleId
      });

      await comment.save();
      res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
      console.error('Error in addComment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
]