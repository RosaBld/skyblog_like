const Comment = require('../models/Comment');
const Article = require('../models/Article');
const User = require('../models/Users');
const auth = require('../middleware/auth');

exports.addComment = [
  auth,
  async (req, res) => {
    const { content, articleId, userId } = req.body;

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


exports.showComment = [
  async (req, res) => {
    const articleId = req.query.articleId;

    try {
      const article = await Article.findById(articleId);
      if (!article) {
        console.log('Article not found in Articles, sending 404');
        return res.status(404).json({ error: 'Article not found' });
      }

      const comments = await Comment.find({ article: articleId });
      const commentsWithUser = await Promise.all(comments.map(async (comment) => {
        const user = await User.findById(comment.user);
        return {
          articleId: article._id,
          _id: comment._id,
          content: comment.content,
          createdAt: comment.createdAt,
          username: user ? user.username : 'Unknown'
        };
      }));

      console.log('Comments found:', commentsWithUser);
      res.status(200).json({ comments: commentsWithUser });
    } catch (error) {
      console.error('Error in showComment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];