const express= require('express');
const userRoute=express();
const { Login, signup, authentication, getUserList, trendingUsers, trendingRegion } = require("../Controllers/UserController");
const { isLogin } = require('../auth');


userRoute.post("/login", Login);
userRoute.post("/signup", signup);
userRoute.post("/checkauthenticate",authentication);
userRoute.post("/getUserList",isLogin,getUserList);
userRoute.get("/getTrendingUser",isLogin,trendingUsers);
userRoute.get("/getTrendingRegion",isLogin,trendingRegion);

module.exports=userRoute;