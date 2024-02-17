const { FindByEmail, FindByUsername, CreateUser,GetUserListDb } = require("../DatabaseFunctions/User");
const bcrypt = require('bcrypt');
const { createToken, verifyToken } = require("../Utils/JWT");
const { trendingUsersDb, trendingRegionDb } = require("../DatabaseFunctions/Message");
const saltRounds = 10;

async function signup(req, res) {
    const userDetail = req.body.userDetail;
    const em = await FindByEmail(userDetail.email);
    if (em) {
        res.status(409).json({ message: "Email already registered" });
        return;
    }
    const us = await FindByUsername(userDetail.usernamr);
    if (us) {
        res.status(409).json({ message: "Username already registered" });
        return;
    }
    userDetail.password = await bcrypt.hash(userDetail.password, saltRounds);
    CreateUser(userDetail.email, userDetail.password, userDetail.username, userDetail.region).then(user => {
        if (user) {
            res.status(200).send("Registered successfully");
        }
        else {
            throw ("can't registered");
        }
    }).catch(err => {
        res.status(500).send(err);
    })
}

async function Login(req, res) {
    const userDetail = req.body.userDetail;
    try {
        const user = await FindByEmail(userDetail.email);
        if (user) {
            bcrypt.compare(userDetail.password, user.password).then(function (result) {
                if (result) {
                    let token = createToken(user._id,user.username,user.email);
                    res.status(200).json({ "email": user.email,"id":user._id, "username": user.username, "token":token });
                    return;
                }
                else {
                    res.status(401).send("invalid credential");
                    return;
                }
            });
        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).send("error");
    }
}

function authentication(req,res){
    const token=req.body.token;
    verifyToken(token).then(result=>{
        if(result){
            res.status(200).send("true");
        }
        else{
            res.status(302).send("false");
        }
    }).catch(err=>{
        res.status(500).send(err);
    });
}

function getUserList(req,res){
    GetUserListDb(req.body.searchText,req.body.userId).then(users=>{
        res.status(200).json(users);
    }).catch(err=>{
        res.status(500).send(err);
    })
}


function trendingUsers(req,res){
    trendingUsersDb().then(users=>{
        res.status(200).json(users);
    }).catch(err=>{
        res.status(500).send(err);
    });
}

function trendingRegion(req,res){
    trendingRegionDb().then(regions=>{
        res.status(200).json(regions);
    }).catch(err=>{
        res.status(500).send(err);
    });
}

module.exports = {
    signup,
    Login,
    authentication,
    getUserList,
    trendingUsers,
    trendingRegion
}