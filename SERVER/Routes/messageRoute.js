const express= require('express');
const messageRoute=express();
const { isLogin } = require('../auth');
const { getMessageOfGroup } = require('../Controllers/MessageController');

messageRoute.post("/getMessageOfGroup",isLogin,getMessageOfGroup);

module.exports=messageRoute;