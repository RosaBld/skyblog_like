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

      // Fetch the latest article for each user created within the last week
      const latestArticles = await Promise.all(users.map(async (user) => {
        const articles = await Article.find({
          user: user._id,
          createdAt: { $gte: oneWeekAgo }
        }).sort({ createdAt: -1 });

        if (articles.length > 0) {
          return {
            user: user.username,
            articles: articles.map(article => ({             
              title: article.title,
              content: article.content,
              createdAt: article.createdAt}
            ))
          };
        }
      }));

      // Filter out null values (users without articles in the last week)
      const filteredArticles = latestArticles.filter(article => article !== null);

      res.status(200).json({ latestArticles: filteredArticles });
    } catch (error) {
      console.error('Error in latestArticlesForWeek:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];