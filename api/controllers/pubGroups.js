// create, update, findbyid
const PubGroup = require("../models/pubGroup")
const TokenGenerator = require("../lib/token_generator") 

const PubGroupsController = {
  Create: (req, res) => {
	console.log(req.body)
    const pubGroup = new PubGroup({
			name: req.body.name,
			members: req.body.members
    });
	
		pubGroup.save((err) => {
			if (err) {
				console.log(err)
				if(err.code === 11000){
					return res.status(400).json({message: 'Group name is already in use. Use a unique group name.'})
				} else {
					return res.status(401).json({ message: 'Group not created' });
				}
			} else {
				const token = TokenGenerator.jsonwebtoken(req.user_id);
				return res.status(201).json({ message: 'Group created', token: token });
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
					return res.status(400).json({ error: 'Both Group ID and user ID are required.' });
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

	UpdateRemoveMember: async (req, res) => {
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

			// Remove member
			await PubGroup.updateOne({ _id: pubGroupId }, { $pull: { members: userId } });
			res.status(200).json({ message: 'Member removed successfully.' });
		} catch (error) {
			console.error('Error removing new member:', error);
			res.status(500).json({ error: 'Internal Server Error.' });
		}
},

		FindMemberInfoByPubGroupID: (req, res) => {
			const pubGroupID = req.params.pubGroupId;
			console.log(pubGroupID)
			PubGroup.findById(pubGroupID)
			.populate('members', '_id, username')
			.exec((err, pubGroup) => {
					if (err) {
						return res.status(500).json({ error: 'Internal Server Error' });
					}
					if (!pubGroup) {
						return res.status(404).json({ error: 'Group not found' });
					}
					const token = TokenGenerator.jsonwebtoken(req.user_id);
					return res.status(200).json({ pubGroup: pubGroup, token: token });
				});
		},
};


module.exports = PubGroupsController;