require('../config');
const crypto = require("crypto");
const cryptoJs = require('crypto-js');
const express = require('express');
const RouteAuth = express.Router();
const UserModel = require('../models/model-user');
const { generateToken, validateTokenThen, validateToken } = require('../helpers/jwt');
const { response200, response403 } = require('../helpers/responses');
const { algorithm, key, iv, plainText, secretKey } = require('../constants');

const decipher = (body) => {
    const { password, nonce, tag } = body;

    const decipher = crypto.createDecipheriv(algorithm, key, iv, {
        authTagLength: 16
    });

    const tagBuffer = Buffer.from(tag, 'hex');
    decipher.setAuthTag(tagBuffer);

    const decipherUpdate = decipher.update(nonce, 'hex', 'utf8');
    const decText = decipherUpdate + decipher.final('utf8');

    const nonceMatching = decText === plainText;
    
    const decryptedPassword = cryptoJs.AES.decrypt(password, nonce).toString(cryptoJs.enc.Utf8);

    const encryption = cryptoJs.AES.encrypt(decryptedPassword, secretKey).toString();

    return { nonceMatching, encryption }
}

// get nonce route
RouteAuth.get('/get-nonce', (req, res) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv, {
        authTagLength: 16
    });
    const cipherUpdate = cipher.update(plainText, 'utf8', 'hex');
    const nonce =  cipherUpdate + cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');
    response200(res, `Nonce`, { nonce, tag });
});

// login route
RouteAuth.post('/login', (req, res) => {
    const { username } = req.body;
    const { nonceMatching, encryption } = decipher(req.body);
    if(nonceMatching) {
        UserModel.findOne({ username }, (err, user) => {
            if (err) throw err;
            const matching = user.comparePassword(encryption, secretKey, user);
            if(matching) {
                const { guid, name, username } = user;
                const jwt = generateToken(guid);
                response200(res, `User exists`, {
                    data: { guid, name, username },
                    jwt
                });
            } else {
                response403(res, `Invalid credentials`);
            }
        });
    } else {
        response403(res, `Invalid credentials`);
    }
});

// verify user route
RouteAuth.post('/verify', (req, res) => {
    validateTokenThen(req, res, () => {
        const { username } = req.body;
        const { nonceMatching, encryption } = decipher(req.body);
        if(nonceMatching) {
            UserModel.findOne({ username }, (err, user) => {
                if (err) throw err;
                const matching = user.comparePassword(encryption, secretKey, user);
                if(matching) {
                    response200(res, `User verified`, {});
                } else {
                    response403(res, `Invalid credentials`);
                }
            });
        } else {
            response403(res, `Invalid credentials`);
        }
    });
});

// verify token route
RouteAuth.get('/verify-token', (req, res) => {
    if(validateToken(req)) {
        response200(res, `User verified`);
    } else {
        response403(res, `Uder not verified`);
    }
});

module.exports = { RouteAuth, decipher };
