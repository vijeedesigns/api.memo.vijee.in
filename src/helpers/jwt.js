const jwt = require('jsonwebtoken');
const { response401 } = require('../helpers/responses');

const generateToken = (userId) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId
    }  
    return jwt.sign(data, jwtSecretKey);
};

const validateToken = (req) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;  
    try {
        const token = req.header(tokenHeaderKey).replace(/bearer:/g, '');
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified) {
            return true;
        } else{
            // Access Denied
            return false;
        }
    } catch (error) {
        // Access Denied
        return false;
    }
}

const validateTokenThen = (req, res, callback=()=>{}) => {
    if(validateToken(req)) {
        callback();
    } else {
        response401(res, `Invalid token`);
    }
}

module.exports = { generateToken, validateToken, validateTokenThen };