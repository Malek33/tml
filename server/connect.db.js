const mongoose = require("mongoose")
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});