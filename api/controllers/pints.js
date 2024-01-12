const Pint = require("../models/pint");
const TokenGenerator = require("../lib/token_generator");

const PintsController = {
  create: (req, res) => {
    const newPint = new Pint({
      owner: req.body.owner,
      owed_by: req.body.owed_by,
      bet: req.body.bet,
    });

    newPint.save((err, savedPint) => {
      if (err) {
        return res.status(400).json({ error: 'Bad request' });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(201).json({ message: 'Pint created', pint: savedPint, token: token });
      }
    });
  },

  index: (req, res) => {
    Pint.find()
    .populate('owner owed_by bet')
    .exec((err, foundPints) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ pints: foundPints, token: token });
      }
    });
},

FindByID: (req, res) => {
    const pintID = req.params.id;
    Pint.findById(pintID)
    .populate('owner owed_by bet')
      .exec((err, pint) => { 
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!pint) { return res.status(404).json({ error: 'Pint not found' });}
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ pint: pint, token: token }); 
      });
  },
  FindByID: (req, res) => {
    const pintID = req.params.id;
    Pint.findById(pintID)
    .populate('owner owed_by bet')
      .exec((err, pint) => { 
        if (err) {return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!pint) { return res.status(404).json({ error: 'Pint not found' });}
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ pint: pint, token: token }); 
      });
  },

  SwitchClaimedToTrue: async (req, res) => {
    const pintID = req.params.id;
    const pint = await Pint.updateOne({_id: pintID}, {$set: {claimed: true}});
    if (!pint) {return res.status(400).json({message: "pint not found"})}
    else {
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ message: 'OK', token: token });
    }
    },

    FindAllOwnedPints: (req, res) => {
      const OwnerID = req.params.owner_id;
      Pint.find({ owner: OwnerID, claimed:false })
      .populate('owner owed_by bet')
        .exec((err, foundPints) => {
          if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
          } else {
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            return res.status(200).json({ pints: foundPints, token: token });
          }
        });
    },
    

};
module.exports = PintsController;
