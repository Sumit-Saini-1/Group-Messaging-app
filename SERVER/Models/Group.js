const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupname: {
        type:String,
        validate: {
            validator: function (v) {
                return v!=="";
            },
            message: "can't be empty!"
        },
    },
    description: {
        type:String,
        validate: {
            validator: function (v) {
                return v!=="";
            },
            message: "can't be empty!"
        },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    inviteLink:String,
    postCount:{
        type:Number,
        default: 0
    }
}, {
    timestamps: true
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;