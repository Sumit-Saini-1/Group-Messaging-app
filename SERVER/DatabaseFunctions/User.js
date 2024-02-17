const User = require("../Models/User");

function CreateUser(email, password, username, region) {
    return new Promise((resolve, reject) => {
        User.create({ email, password, username, region }).then(user => {
            resolve(user);
        }).catch(err => {
            reject(err);
        });
    });
}

function FindByEmail(email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }).then(user => {
            resolve(user);
        }).catch(err => {
            reject(err);
        });
    });
}

function FindByUsername(username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }).then(user => {
            resolve(user);
        }).catch(err => {
            reject(err);
        });
    });
}

function GetUserListDb(searchText, userID) {
    return new Promise((resolve, reject) => {
        const pattern = new RegExp(searchText, 'i');
        User.find({ $and: [{ username: { $regex: pattern } }, { _id: { $ne: userID } }] }, { username: 1 }).sort({ username: 'asc' }).then(users => {
            resolve(users);
        }).catch(err => {
            reject(err);
        });
    });
}
function GetUsersToInviteDb(searchText, userID) {
    return new Promise((resolve, reject) => {
        const pattern = new RegExp(searchText, 'i');
        User.find({ $and: [{ username: { $regex: pattern } }, { _id: { $ne: userID } }] }, { username: 1 }).sort({ username: 'asc' }).then(users => {
            resolve(users);
        }).catch(err => {
            reject(err);
        });
    });
}



module.exports = {
    CreateUser,
    FindByEmail,
    FindByUsername,
    GetUserListDb,
    GetUsersToInviteDb
}