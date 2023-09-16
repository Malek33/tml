const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fName: { type: String, required: [true, "Please add your first name"] },
  lName: { type: String, required: [true, "Please add your last name"] },
  email: { type: String, required: true, unique: true, required: [true, "Please add your email"] },
  verified: { type: Boolean, default: false },
  password: { type: String, required: true, minlength: [6, 'Password must be at least 6 characters'], required: [true, "Please add your Password"]},
  profilePicture: { type: String, default: 'https://us.123rf.com/450wm/tifani1/tifani11801/tifani1180100032/93016694-user-icon-vector-illustration-on-black-background.jpg?ver=6' }, // Store the image filename or URL
  profileBackdrop: { type: String, default: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/249bf307-8488-46a1-abe6-de1782835124/dfa4e4n-51ef8f17-df30-4874-bae7-ea11355e3f0f.jpg/v1/fill/w_1080,h_360,q_75,strp/spider_man___superior_spider_man_banner_by_willieirvingiii_dfa4e4n-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzYwIiwicGF0aCI6IlwvZlwvMjQ5YmYzMDctODQ4OC00NmExLWFiZTYtZGUxNzgyODM1MTI0XC9kZmE0ZTRuLTUxZWY4ZjE3LWRmMzAtNDg3NC1iYWU3LWVhMTEzNTVlM2YwZi5qcGciLCJ3aWR0aCI6Ijw9MTA4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.nmaTviomPZNR9kXbIrhIiZOxU95HDGyM9ehcf9S5Pp4' }, // Store the image filename or URL
  birthday: String,
  darkMode: {type: Boolean, default: true},
  gender: String,
  location: String,
  pronoun: String,
  recentMovies: [
    {
      movieTitle: String,
      posterPath: String,
      movieId: String,
      watchedAt: { type: Date, default: Date.now },
    },
  ],
  likedMovies: [
    {
      movieTitle: String,
      posterPath: String,
      movieId: String,
      watchedAt: { type: Date, default: Date.now },
    },
  ],
  bookmarkedMovies: [
    {
      movieTitle: String,
      posterPath: String,
      movieId: String,
      watchedAt: { type: Date, default: Date.now },
    },
  ],
  bio: String,
  socialMedia: {
    facebook: String,
    youtube: String,
    whatsApp: String,
    instagram : String,
    tikTok: String,
    telegram: String,
    x: String,
    snapchat: String,
    pinterest: String,
    reddit: String,
    linkedIn: String,
    discord: String,
    twitch: String,
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
