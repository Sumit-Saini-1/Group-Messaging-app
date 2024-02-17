const { CreateGroupDb, GetGroupListDb, trendingGroupsDb } = require("../DatabaseFunctions/Group");
const { addMemberDb } = require("../DatabaseFunctions/Members");

function createGroup(req,res){
    const groupname=req.body.groupname;
    const description=req.body.description;
    const createdBy=req.body.userId;
    const inviteLink="http://localhost:2000/group/join/"+groupname+createdBy+new Date();
    const listOfParticipant=req.body.listOfParticipant;
    CreateGroupDb(groupname,description,createdBy,inviteLink).then(group=>{
        if(group){
            listOfParticipant.forEach(async (m,i)=> {
                await addMemberDb(group._id,m._id);
                if(i==listOfParticipant.length-1){
                    if(listOfParticipant.indexOf(createdBy)==-1){
                        await addMemberDb(group._id,createdBy);
                    }
                    res.status(200).json(group);
                }
            });
        }
        else{
            res.status(500).json(err);
        }
    }).catch(err=>{
        res.status(500).send(err);
    });
}

function getGroupList(req,res){
    GetGroupListDb().then(groups=>{
        res.status(200).json(groups);
    }).catch(err=>{
        res.status(500).send(err);
    });
}

function trendingGroups(req,res){
    trendingGroupsDb().then(groups=>{
        res.status(200).json(groups);
    }).catch(err=>{
        res.status(500).send(err);
    })
}

module.exports={
    createGroup,
    getGroupList,
    trendingGroups
}