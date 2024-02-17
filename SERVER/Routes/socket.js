const { isMemberOfGroupDb } = require("../DatabaseFunctions/Members");
const { createMsgDb } = require("../DatabaseFunctions/Message");

module.exports = (chatServer) => {
    chatServer.on('connection', function (socket) {
        console.log(4, 'a user connected');
        socket.on("open_group", function (groupId) {
            socket.join(groupId);
        });

        socket.on('chat_message', function (msgobj) {
            isMemberOfGroupDb(msgobj.group, msgobj.sendBy._id).then(user => {
                if (user) {
                    createMsgDb(msgobj.message, msgobj.sendBy._id, msgobj.group).then(msg => {
                        // console.log(msg);
                        socket.in(msgobj.group).emit('new_message', msgobj);
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err.message);
            })
        });

        socket.on("disconnect", function () {
            console.log("a user disconnected");
        });
    });
}