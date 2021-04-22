require("dotenv").config();

const router = require("express").Router(),
  { User } = require("../db"),
  emailValidator = require("email-validator")

const AuthService = require("../utils/services/auth");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email }).then(async (user) => {
    const isUser = await AuthService.verifyPassword(user.password, password)
    user = AuthService.formatUser(user);
    const token = await AuthService.generateToken(user)
    outUser = { user, token };
    if (outUser) {
      res.status(200).json(outUser)
    }
  })
  .catch(e => {
    res.status(409).end('error/auth-invalid-credentials')
  })
});

router.post("/new", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    password = await AuthService.hashPassword(password);
    const inDB = await User.findOne({ email });
    const isValid = emailValidator.validate(email);

    if (inDB) {
      return res.status(409).end("error/user-in-database");
    } else if (!isValid) {
      return res.status(400).end("error/invalid-email");
    }

    const rawUser = await new User({ name, email, password }).save();
    user = AuthService.formatUser(rawUser);

    return res
      .status(200)
      .json({ user, token: await AuthService.generateToken(rawUser) });
  } catch (e) {
    console.log(e);
    res.status(400).end("fail");
  }
});

router.post('/like', async (req, res) => {
  try {
    await AuthService.likePost()
  } catch(e) {
    console.log(e)
    res.end('error/like-post-error')
  }
})

module.exports = router;
