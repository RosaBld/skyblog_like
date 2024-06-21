const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require ('./controllers/userController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/skyblog_like', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.post("/register", userController.register);
app.post("/login", userController.login);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));