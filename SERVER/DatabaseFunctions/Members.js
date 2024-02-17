const mongoose = require("mongoose");
const Member = require("../Models/Members");

function addMemberDb(groupID, userID) {
    return new Promise((resolve, reject) => {
        Member.create({ userID: userID, groupID: groupID }).then(mid => {
            resolve(mid);
        }).catch(err => {
            reject(err);
        });
    });
}

function removeMemberDb(groupID, userID) {
    return new Promise((resolve, reject) => {
        Member.deleteOne({ userID: userID, groupID: groupID }).then(deleted => {
            resolve(deleted?.deletedCount);
        }).catch(err => {
            reject(err);
        });
    });
}

function findMineGroupDb(userID) {
    return new Promise((resolve, reject) => {
        Member.find({ userID: userID }).populate({ path: 'groupID', select: 'groupname postCount', options: { $sort: { postCount: -1 } } }).then(groups => {
            groups.sort((a, b) => {
                return b?.groupID?.postCount - a?.groupID?.postCount
            });
            resolve(groups);
        }).catch(err => {
            console.log(err.message);
            reject(err);
        });
    });
}

function isMemberOfGroupDb(groupID, userID) {
    return new Promise((resolve, reject) => {
        Member.findOne({ groupID: groupID, userID: userID }).then(user => {
            resolve(user);
        }).catch(err => {
            reject(err);
        });
    });
}

function findMembersOfGroupDb(groupID) {
    return new Promise((resolve, reject) => {
        Member.aggregate([
            {
                $match: { groupID: new mongoose.Types.ObjectId(groupID) }
            },
            {
                $lookup: {
                    from: 'users', // The name of the 'users' collection
                    localField: 'userID',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    username: '$user.username'
                }
            },
            {
                $sort: { username: 1 } // 1 for ascending order
            }
        ]).then(members => {
            resolve(members);
        }).catch(err => {
            console.log(err.message);
            reject(err);
        });
    });
}

module.exports = {
    addMemberDb,
    removeMemberDb,
    findMineGroupDb,
    isMemberOfGroupDb,
    findMembersOfGroupDb,
}