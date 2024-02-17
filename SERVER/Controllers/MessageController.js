const { isMemberOfGroupDb } = require("../DatabaseFunctions/Members");
const { getMessageOfGroupDb } = require("../DatabaseFunctions/Message");

function getMessageOfGroup(req, res) {
    const groupId = req.body.groupId;
    const page = req.body.page;
    const contentOnOne = req.body.contentOnOne;
    // console.log(7,groupId);
    isMemberOfGroupDb(groupId, req.body.userId).then(user => {
        if (user) {
            getMessageOfGroupDb(groupId, page, contentOnOne).then(messages => {
                // console.log(messages);
                res.status(200).json(messages);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
        else {
            res.status(401).send("Not authorised");
        }
    }).catch(err => {
        res.status(500).send(err);
    });

}



module.exports = {
    getMessageOfGroup
}