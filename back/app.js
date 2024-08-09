require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require ('./controllers/userController');
const auth = require('./middleware/auth')
const cookieParser = require('cookie-parser');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/skyblog_like';

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB Connection error:', err)
  }
}

connectToMongoDB();

// mongoose.connect(mongoURI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

app.post("/register", userController.register);
app.post("/login", userController.login);
app.put('/update-username', auth, userController.updateUsername);
app.put('/update-password', auth, userController.updatePassword);
app.get("/user/:userId", userController.getUserInfo);
app.get("/health", (req, res) => res.send('OK'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));