const mongoose = require("mongoose");

const WagerSchema = new mongoose.Schema({
  peopleInvolved:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []},
  quantity: {type: Number, default: 1},
  description: {type: String, required: true},
  datemade: {type: Date, default: new Date()},
  deadline: {type: Date, required: true},
  approved: {type: Boolean, default: false},
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null}

});

const Wager = mongoose.model("Wager", WagerSchema);

module.exports = Wager;