// create, update, findbyid
const PubGroup = require("../models/pubGroup")
const TokenGenerator = require("../lib/token_generator") 

const PubGroupsController = {
  Create: (req, res) => {
    const pubGroup = new PubGroup({
			name: req.body.name,
    });
	
		pubGroup.save((err) => {
			if (err) {
        return res.status(401).json({ message: 'Pub Group not created' });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(201).json({ message: 'Pub Group created', token: token });
      }
		})
	},

		Index: (req, res) => {
			PubGroup.find((err, pubGroups) => {
				if (err) {
					return res.status(500).json({ error: 'Internal Server Error' });
				}
				const token = TokenGenerator.jsonwebtoken(req.user_id);
				return res.status(200).json({ pubGroups: pubGroups, token: token });
			});
		},

		FindInfoByGroupID: (req, res) => {
			const pubGroupID = req.params.id;
			PubGroup.findById(pubGroupID)
			// .populate('peopleInvolved winner')
			.exec((err, pubGroup) => {
					if (err) {
						return res.status(500).json({ error: 'Internal Server Error' });
					}
					if (!pubGroup) {
						return res.status(404).json({ error: 'Pub Group not found' });
					}
					const token = TokenGenerator.jsonwebtoken(req.user_id);
					return res.status(200).json({ pubGroup: pubGroup, token: token });
				});
		},

};


module.exports = PubGroupsController;