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

  async createNewPost(author, title, content) {
    const post = await new Post({
      author,
      title,
      content,
    }).save();
    return post;
  }
}

module.exports = new PostService();
