const jwt = require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET_KEY_FOR_TOKEN|| process.config.SECRET_KEY_FOR_TOKEN;
function createToken(userId,username,email) {
    const token = jwt.sign({
        userId,
        username,
        email
    },
        SECRET_KEY,
        { expiresIn: '30m' }
    );
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log(19, err);
                reject(false);
            }
            else {
                resolve(decoded);
            }
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}