const { Post } = require("../../db");

class PostService {
  constructor() {}

  async getUserPosts(user) {
    return await Post.find({ name: user.name });
  }

  async getPosts(limit) {
    if (limit) {
      return (await Post.find({}).limit(limit).exec()) || null;
    } else {
      return (await Post.find({})) || null;
    }
  }

  async getPostById(id) {
    return await Post.findById(id);
  }

  async createNewPost() {
    const post = await new Post({
      author: "Connor Gunderson",
      title: "blue whales can fly",
      content: "yes they really can",
      imageURL: "http://placeimg.com/640/480/cats",
    }).save();
    return post;
  }
}

module.exports = new PostService();
