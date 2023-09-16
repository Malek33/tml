const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const requireAuth = require("../middleware/requireAuth");

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ user: user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { fName, lName, email, password } = req.body;
    // res.json({ user: req.body });

    // Check if the username is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'email is already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await User.create({ fName, lName, email, password: hashedPassword });

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.get('/profile', requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log(userId);
    // res.json({ user: req.body });

    // Check if the username is already taken
    const existingUser = await User.findOne({ _id: userId });
    if (existingUser) {
      return res.status(200).json({ user: existingUser });
    }
    return res.status(400).json({ message: 'user does not exist' });

  } catch (error) {
    res.status(500).json({ message: 'Error getting user data', error: error.message });
  }
});

router.post('/recent-movie', async (req, res) => {
  try {
    const { userId, movie } = req.body;

    // Check if the movie with the same movieId is already in the recentMovies array
    const existingUser = await User.findOne({ _id: userId });
    if (existingUser.recentMovies.some(recentMovie => recentMovie.movieId == movie.movieId)) {
      return res.status(400).json({ message: 'Movie already saved' });
    }

    // Update the user's recentMovies array with the new movie
    await User.findByIdAndUpdate(userId, { $push: { recentMovies: movie } });

    if (existingUser.recentMovies.length > 19) {
      existingUser.recentMovies = existingUser.recentMovies.slice(1);
      await existingUser.save();
    }

    res.status(200).json({ message: 'Movie added to recent movies' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to recent movies', error: error.message });
  }
});

router.post('/liked-movie', async (req, res) => {
  try {
    const { userId, movie } = req.body;

    const existingUser = await User.findOne({ _id: userId });
    if (existingUser.likedMovies.some(likedMovies => likedMovies.movieId == movie.movieId)) {
      return res.status(400).json({ message: 'Movie already liked' });
    }

    // Update the user's likedMovies array with the new liked movie
    await User.findByIdAndUpdate(userId, { $push: { likedMovies: movie } });

    res.json({ message: 'Movie added to liked movies' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to liked movies', error: error.message });
  }
});

router.delete('/:userId/movie-liked/:movieId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the movie from the user's likedMovies array
    user.likedMovies = user.likedMovies.filter(movie => movie.movieId !== movieId);
    await user.save();
    res.json({ message: 'Movie removed from liked movies' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing movie from liked movies', error: error.message });
  }
});

router.post('/bookmarked-movie', async (req, res) => {
  try {
    const { userId, movie } = req.body;

    const existingUser = await User.findOne({ _id: userId });

    if (existingUser.bookmarkedMovies.some(bookmarkedMovie => bookmarkedMovie.movieId == movie.movieId)) {
      return res.status(400).json({ message: 'Movie already bookmarked' });
    }

    // Update the user's likedMovies array with the new liked movie
    await User.findByIdAndUpdate(userId, { $push: { bookmarkedMovies: movie } });

    res.json({ message: 'Movie added to bookmarked movies' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to bookmarked movies', error: error.message });
  }
});

router.delete('/:userId/bookmarked-movie/:movieId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    // console.log(userId, movieId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the movie from the user's likedMovies array
    user.bookmarkedMovies = user.bookmarkedMovies.filter(movie => movie.movieId !== movieId);
    await user.save();
    res.json({ message: 'Movie removed from bookmarked movies' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing movie from bookmarked movies', error: error.message });
  }
});

module.exports = router;
