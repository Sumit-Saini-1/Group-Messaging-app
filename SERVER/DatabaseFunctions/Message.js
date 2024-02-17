const Message = require("../Models/Message");

function getMessageOfGroupDb(groupId, page = 0, contentOnOne = 10) {
    return new Promise((resolve, reject) => {
        Message.find({ group: groupId }).populate({ path: 'sendBy', select: 'username' }).sort({ createdAt: -1 }).skip(page * contentOnOne).limit(contentOnOne).then(messages => {
            resolve(messages);
        }).catch(err => {
            reject(err);
        });
    });
}

function createMsgDb(message, sendBy, group) {
    return new Promise((resolve, reject) => {
        Message.create({ message, sendBy, group }).then(msg => {
            resolve(msg);
        }).catch(err => reject(err));
    });
}

function trendingUsersDb() {
    return new Promise((resolve, reject) => {
        Message.aggregate([
            {
                $group: {
                    _id: "$sendBy",
                    count: { $count: {} }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $project: {
                    _id: '$user._id',
                    username: '$user.username',
                    count: 1, 
                },
            },
        ]).sort({count:-1}).limit(5).then(users => {
            // console.log(users);
            resolve(users);
        }).catch(err => {
            reject(err);
        });
    });
}

function trendingRegionDb(){
    return new Promise((resolve, reject) => {
        Message.aggregate([
            {
              $lookup: {
                from: 'users',
                localField: 'sendBy',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $unwind: '$user',
            },
            {
              $group: {
                _id: '$user.region',
                messageCount: { $sum: 1 },
              },
            },
            {
                $project: {
                    "region": "$_id",
                    messageCount:1
                },
            },
            {
              $sort: { messageCount: -1 },
            },
            {
              $limit: 5,
            },
          ]).then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        });
          
    });
}

module.exports = {
    getMessageOfGroupDb,
    createMsgDb,
    trendingUsersDb,
    trendingRegionDb
}