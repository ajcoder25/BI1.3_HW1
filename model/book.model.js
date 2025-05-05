const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String], // Array of strings like ["Non-fiction", "Business"]
    required: true,
  },
  language: {
    type: String,
    default: "English",
  },
  country: {
    type: String,
    default: "United States",
  },
  rating: {
    type: Number,
  },
  summary: {
    type: String,
  },
  coverImageUrl: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
