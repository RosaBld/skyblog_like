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

exports.latestArticlesForWeek = [
  auth,
  async (req, res) => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Fetch all users
      const users = await User.find();

      // Fetch the latest articles for each user created within the last week
      const latestArticles = await Promise.all(users.map(async (user) => {
        const articles = await Article.find({
          user: user._id,
          createdAt: { $gte: oneWeekAgo }
        }).sort({ createdAt: -1 });

        return articles.map(article => ({
          user: user.username,
          title: article.title,
          content: article.content,
          createdAt: article.createdAt
        }));
      }));

      // Flatten the array of arrays and filter out empty arrays
      const flattenedArticles = latestArticles.flat().filter(article => article);

      // Sort the flattened articles by createdAt in descending order
      const sortedArticles = flattenedArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.status(200).json({ articles: sortedArticles });
    } catch (error) {
      console.error('Error in latestArticlesForWeek:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];