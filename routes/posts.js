const router = require("express").Router(),
  PostService = require("../utils/services/posts"),
  { Post } = require("../db");

// jwt middleware
const { isAuthenticated, attachCurrentUser } = require("../utils/middleware");

// get all posts associated with a user
router.get("/user", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.currentUser.name });
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(400).end("fail");
  }
});

// route to let the user make a new post if authenticated
router.post("/new", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const {author, title, content, imageURL} = req.body
    const newPost = await PostService.createNewPost(author, title, content, imageURL);
    if (newPost) {
      res.status(200).end("success");
    } else {
      res.status(304).end("fail");
    }
  } catch (e) {
    console.log(e);
    res.status(400).end("fail");
  }
});

// route to retrieve 20 posts for the home page of the application
router.get("/all", async (req, res) => {
  try {
    let posts;
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      posts = await PostService.getPosts(limit);
    } else {
      posts = await PostService.getPosts();
    }
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(400).end(e);
  }
});

// get a specific post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    res.status(200).json(post);
    res.end("success");
  } catch (e) {
    console.log(e);
    res.status(400).end(e);
  }
});

module.exports = router;
