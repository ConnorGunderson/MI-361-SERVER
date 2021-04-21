require("dotenv").config();

const router = require("express").Router(),
  { User } = require("../db"),
  emailValidator = require("email-validator")

const AuthService = require("../utils/services/auth");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }).then(async (user) => {
      const isUser = await AuthService.verifyPassword(user.password, password)
      user = AuthService.formatUser(user);
      const token = await AuthService.generateToken(user)
      outUser = { user, token };
      res.status(200).json(user)
    })
  } catch (e) {
    res.end(e);
  }
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

module.exports = router;
