const { findMineGroupDb, findMembersOfGroupDb, removeMemberDb } = require("../DatabaseFunctions/Members");

function removeMember(req,res){
    const groupID=req.body.groupID;
    const userID=req.body.userId;
    removeMemberDb(groupID, userID).then(deleted=>{
        res.status(200).send("exit");
    }).catch(err=>{
        res.status(500).send(err);
    })
}

function findMineGroup(req,res){
    findMineGroupDb(req.body.userId).then(groups=>{
        res.status(200).json(groups);
    }).catch(err=>{
        res.status(500).send(err);
    });
}

function findMembersOfGroup(req,res){
    const groupID=req.body.groupID;
    findMembersOfGroupDb(groupID).then(members=>{
        res.status(200).json(members);
    }).catch(err=>{
        res.status(500).send(err);
    });
}

module.exports={
    findMineGroup,
    findMembersOfGroup,
    removeMember
}