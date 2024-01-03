const mongoose = require("mongoose");

const PintSchema = new mongoose.Schema({
  owner:{type: mongoose.Schema.Types.ObjectId,ref: 'User',default: null},
  datemade: {type: Date, default: new Date()},
  owed_by:{type: mongoose.Schema.Types.ObjectId,ref: 'User',default: null},
  bet:{type: mongoose.Schema.Types.ObjectId,ref: 'Wager',default: null}
});

const Pint = mongoose.model("Pint", PintSchema);

module.exports = Pint;
