const express= require('express');
const { isLogin } = require('../auth');
const { inviteUsers, getUsersToInvite, getInivitations, invitationResponse } = require('../Controllers/InvitationController');
const invitationRoute=express();

invitationRoute.post("/getUsersToInvite",isLogin,getUsersToInvite);
invitationRoute.post("/inviteUsers",isLogin,inviteUsers);
invitationRoute.post("/invitationResponse",isLogin,invitationResponse);
invitationRoute.get("/getInvitations",isLogin,getInivitations);

module.exports=invitationRoute;