const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  imageURL: { type: String },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
