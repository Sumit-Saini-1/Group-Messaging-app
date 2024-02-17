const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
    groupID: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: 'N'//N for no action is done by user yet
    }
}, {
    timestamps: true
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;