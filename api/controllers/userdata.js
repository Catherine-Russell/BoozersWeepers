const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UserdataController = {
  Index: (req, res) => {
    User.find({}, '-password', (err, users) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ users: users, token: token });
    });
  },
  FindByID: (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
		.populate('user_id', '-password')
    .exec((err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ user: user, token: token });
      });
  },
};

module.exports = UserdataController;