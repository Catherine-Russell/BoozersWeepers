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

	UpdateAddMember: async (req, res) => {
			// Finds the pubGroup to update
			try{
				const pubGroupId = req.params.pubGroupId;
				const userId = req.user_id;
				if (!pubGroupId || !userId) {
					return res.status(400).json({ error: 'Both Pub Group ID and user ID are required.' });
				}
				const existingPubGroup = await PubGroup.findById(pubGroupId);
				if (!existingPubGroup) {
					return res.status(404).json({ error: 'Group not found.' });
				}
	
				// Add member
				await PubGroup.updateOne({ _id: pubGroupId }, { $push: { members: userId } });
				res.status(200).json({ message: 'Member added successfully.' });
			} catch (error) {
				console.error('Error adding new member:', error);
				res.status(500).json({ error: 'Internal Server Error.' });
			}
	},

		FindMemberInfoByPubGroupID: (req, res) => {
			const pubGroupID = req.params.pubGroupId;
			PubGroup.findById(pubGroupID)
			.populate('members')
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