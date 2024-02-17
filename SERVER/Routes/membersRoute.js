const express= require('express');
const memberRoute=express();
const { isLogin } = require('../auth');
const { findMineGroup, findMembersOfGroup, removeMember } = require('../Controllers/MembersController');

memberRoute.get("/getMineGroup",isLogin,findMineGroup);
memberRoute.post("/getMembersOfGroup",isLogin,findMembersOfGroup);
memberRoute.post("/exitFromGroup",isLogin,removeMember);

module.exports=memberRoute;