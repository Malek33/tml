const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');


router.get('/user', requireAuth, (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
