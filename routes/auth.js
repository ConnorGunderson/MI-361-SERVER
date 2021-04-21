require("dotenv").config();

const router = require("express").Router(),
  { User } = require("../db"),
  emailValidator = require("email-validator")

const AuthService = require("../utils/services/auth");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const rawUser = await User.findOne({ email });
    
    if (rawUser === null) return res.status(404).end('error/user-not-found')

    if (!(await AuthService.verifyPassword(rawUser.password, password))) {
      res.status(409).end("error/wrong-credentials");
    }
    let user = AuthService.formatUser(rawUser);

    outUser = { user, token: await AuthService.generateToken(rawUser) };

    res.status(200).json(outUser);
  } catch (e) {
    console.log(e);
    res.status(400).end("error/auth-invalid-credentials");
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
