const Wager = require("../models/wager");
const TokenGenerator = require("../lib/token_generator");
 

const WagersController = {
	Create: (req, res) => {
		const wager = new Wager({
			peopleInvolved: [req.user_id, req.body.challengedUser],
			description: req.body.description,
			deadline: req.body.deadline,
		})
		wager.save((err) => {
			if (err) {
				res.status(400).json({message: 'Bad request'})
			} else {
				const token = TokenGenerator.jsonwebtoken(req.user_id)
				res.status(201).json({ message: 'OK', token: token });
			}
		});
	},
	Index: (req, res) => {
    Wager.find((err, wagers) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ wagers: wagers, token: token });
    });
  },

  Accept: async (req, res) => {
	const wagerID = req.params.wager_id;
	const wager = await Wager.updateOne({_id: wagerID}, {$set: {approved: true}});
	if (!wager) {
		return res.status(400).json({message: "wager_id not found"})
	}
	else {
		const token = TokenGenerator.jsonwebtoken(req.user_id)
		res.status(200).json({ message: 'OK', token: token });
	}
  },
}

module.exports = WagersController;
