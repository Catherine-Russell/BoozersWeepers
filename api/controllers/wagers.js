const Wager = require("../models/wager");
const TokenGenerator = require("../lib/token_generator");

const WagersController = {
  Create: (req, res) => {
    const wager = new Wager({
      peopleInvolved: [req.user_id, req.body.challengedUser],
      description: req.body.description,
      deadline: req.body.deadline,
    });

    wager.save((err) => {
      if (err) {
        return res.status(400).json({ message: 'Bad request' });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(201).json({ message: 'OK', token: token });
      }
    });
  },

  Index: (req, res) => {
    Wager.find((err, wagers) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      return res.status(200).json({ wagers: wagers, token: token });
    });
  },

  FindByID: (req, res) => {
    const wagerID = req.params.id;
    Wager.findById(wagerID)
		.populate('peopleInvolved winner')
    .exec((err, wager) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!wager) {
          return res.status(404).json({ error: 'Wager not found' });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ wager: wager, token: token });
      });
  },

  UpdateWinner: (req, res) => {
  Wager.updateOne( { id: req.params.wagerID },
  {
    $set: {
      winner: req.params.winnerID
    }
})
  }
};

module.exports = WagersController;
