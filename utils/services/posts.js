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

  async likePost(id) {
    console.log(id)
    const post = await Post.findById(id)
    if (post) {
      post.like += 1
      return await post.save()
    } else {
      return 'error/post-not-found'
    }
  }

  async createNewPost(author, title, content, imageURL) {
    const post = await new Post({
      author,
      title,
      content,
      imageURL
    }).save();
    return post;
  }
}

module.exports = new PostService();
