const { inviteForGroupDb, getInivitationsDb, invitationResponseDb } = require("../DatabaseFunctions/Invitation");
const { addMemberDb } = require("../DatabaseFunctions/Members");
const { GetUsersToInviteDb } = require("../DatabaseFunctions/User");

function inviteUsers(req,res){
    const user=req.body.user;
    const groupID=req.body.groupID;
    inviteForGroupDb(groupID,user).then(invited=>{
        if(invited){
            res.status(200).send("invited");
        }
        else{
            res.status(409).send("already exist");
        }
    }).catch(err=>{
        res.status(500).send(err);
    });
}
function getUsersToInvite(req,res){
    const searchText=req.body.searchText;
    const userID=req.body.userId;
    GetUsersToInviteDb(searchText,userID).then(users=>{
        res.status(200).json(users);
    }).catch(err=>{
        res.status(500).send(err);
    })
}

function getInivitations(req,res){
    const userID=req.body.userId;
    getInivitationsDb(userID).then(invitations=>{
        res.status(200).json(invitations);
    }).catch(err=>{
        res.status(500).send(err);
    });
}

function invitationResponse(req,res){
    const invitationID=req.body.invitationID;
    const response=req.body.response;
    const groupID=req.body.groupID;
    const userID=req.body.userId;
    if(response!='A'){
        response='R';
    }
    Promise.all([invitationResponseDb(invitationID,response),addMemberDb(groupID,userID)]).then(results=>{
        res.status(200).send("success");
    }).catch(err=>{
        res.status(500).send(err);
    });
}

module.exports={
    inviteUsers,
    getUsersToInvite,
    getInivitations,
    invitationResponse
}