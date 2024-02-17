const Group = require("../Models/Group");

function CreateGroupDb(groupname,description,createdBy,inviteLink){
    return new Promise((resolve, reject) => {
        Group.create({
            groupname:groupname,
            description:description,
            createdBy:createdBy,
            inviteLink:inviteLink
        }).then(group=>{
            resolve(group);
        }).catch(err=>{
            reject(err);
        })
    });
}

function GetGroupListDb(){
    return new Promise((resolve, reject) => {
        Group.find({},{groupname:1}).then(groups=>{
            resolve(groups);
        }).catch(err=>{
            reject(err);
        });
    });
}

function trendingGroupsDb(){
    return new Promise((resolve, reject) => {
        Group.find({}).sort({postCount:-1}).limit(5).then(groups=>{
            resolve(groups);
        }).catch(err=>{
            reject(err);
        });
    });
}



module.exports={
    CreateGroupDb,
    GetGroupListDb,
    trendingGroupsDb
}