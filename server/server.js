const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/routes'); // This should be 'routes.js'
cors = require("cors");
const app = express();


dotenv.config();
require("./connect.db")

app.use(express.json());
app.use(cors())
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
