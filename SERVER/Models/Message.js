const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Message can't be empty!"],
    },
    sendBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
        index: true,
    }
}, {
    timestamps: true,
});
messageSchema.index({ group: 1 });
messageSchema.pre("save", async function(next) {
    try {
        // Increment postCount in the associated Group
        const Group = mongoose.model("Group");
        await Group.updateOne({ _id: this.group }, { $inc: { postCount: 1 } });

        next();
    } catch (error) {
        next(error);
    }
});
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;