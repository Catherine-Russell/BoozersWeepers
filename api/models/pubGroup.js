const mongoose = require("mongooose");

const PubGroupSchema = new mongoose.Schema({
    name: String,
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []},
})