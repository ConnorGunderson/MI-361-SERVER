require("dotenv").config();

const jwt = require("jsonwebtoken"),
  argon2 = require("argon2");

class AuthService {
  constructor() {}

  async hashPassword(password) {
    return await argon2.hash(password + process.env.AUTH_SALT);
  }

  async verifyPassword(hash, compare) {
    return await argon2.verify(hash, compare + process.env.AUTH_SALT);
  }

  async generateToken(user) {
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
    const signature = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
    const options = { algorithm: "RS256", expiresIn: "2h" };

    return jwt.sign(data, signature, options);
  }

  formatUser(user) {
    const { name, email } = user;
    return {
      name,
      email,
    };
  }
}

module.exports = new AuthService();
