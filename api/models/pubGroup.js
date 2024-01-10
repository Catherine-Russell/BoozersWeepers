const mongoose = require("mongoose");

const PubGroupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []},
})

const PubGroup = mongoose.model("PubGroup", PubGroupSchema);

module.exports = PubGroup;