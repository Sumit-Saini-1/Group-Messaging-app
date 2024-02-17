const { verifyToken } = require("./Utils/JWT")
const isLogin = function (req, res, next) {
    let token = req.headers.authorization;
    verifyToken(token).then(result => {
        if (result) {
            req.body.userId=result.userId;
            req.body.username=result.username;
            req.body.email=result.email;
            next();
        }
        else {
            res.status(401).json({err:"not loggedin"});
            return;
        }
    }).catch(err => {
        console.log(err);
        res.status(401).send({err:"not loggedin"});
    });
    // next();
}

module.exports={
    isLogin
}