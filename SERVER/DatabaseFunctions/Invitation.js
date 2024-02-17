const Invitation = require("../Models/Inivitation");

function inviteForGroupDb(groupID, userID) {
    console.log(groupID);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await Invitation.findOne({ groupID, userID });
            if (!user) {
                user = await Invitation.create({ groupID, userID });
                if (user) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            else {
                reject(false);
            }
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    });
}

function getInivitationsDb(userID) {
    return new Promise((resolve, reject) => {
        Invitation.find({ userID: userID, status: 'N' }).populate({ path: 'groupID', select: 'groupname' }).then(invitations => {
            // console.log(invitations);
            resolve(invitations);
        }).catch(err => {
            console.log(err.message);
            reject(err);
        })
    });
}

function invitationResponseDb(invitationID, response) {
    return new Promise((resolve, reject) => {
        Invitation.updateOne({ _id: invitationID, }, { status: response }).then(updated => { 
            if(updated){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(err=>{
            reject(err);
        });
    })
}

module.exports = {
    inviteForGroupDb,
    getInivitationsDb,
    invitationResponseDb
}