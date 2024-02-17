const express= require('express');
const { createGroup, getGroupList, trendingGroups } = require('../Controllers/GroupController');
const { isLogin } = require('../auth');
const groupRoute=express();

groupRoute.post("/createGroup",isLogin,createGroup);
groupRoute.get("/getGroupList",isLogin,getGroupList);
groupRoute.get("/trendingGroups",isLogin,trendingGroups);

module.exports=groupRoute;