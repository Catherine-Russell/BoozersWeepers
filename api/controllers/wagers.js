const Wager = require("../models/wager");
const TokenGenerator = require("../lib/token_generator");
 

const WagersController = {
	Create: (req, res) => {
		const wager = new Wager(req.body);
		wager.save((err) => {
			if (err) {
				res.status(400).json({message: 'Bad request'})
			} else {
				const token = TokenGenerator.jsonwebtoken(req.user_id)
				res.status(201).json({ message: 'OK', token: token });
			}
		});
	},
}

module.exports = WagersController;
