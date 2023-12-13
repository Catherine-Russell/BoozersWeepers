const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UserdataController = {
  Index: (req, res) => {
    User.find((err, users) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ users: users, token: token });
    });
  }
};

module.exports = UserdataController;