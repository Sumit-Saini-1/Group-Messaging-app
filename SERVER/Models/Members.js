const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
    groupID: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Member = mongoose.model("Member", membersSchema);

module.exports = Member;