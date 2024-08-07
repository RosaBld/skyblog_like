const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require ('./controllers/userController');
const auth = require('./middleware/auth')
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/skyblog_like')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.post("/register", userController.register);
app.post("/login", userController.login);
app.put('/update-username', auth, userController.updateUsername);
app.put('/update-password', auth, userController.updatePassword);
app.get("/user/:userId", userController.getUserInfo);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));