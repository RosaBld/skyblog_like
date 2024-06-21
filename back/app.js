const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/skyblog_like', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));