const mongoose = require("mongoose"),
      faker = require('faker')

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  imageURL: { type: String, default: faker.image.image() },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
