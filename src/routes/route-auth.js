require("../config");
const crypto = require("crypto");
const cryptoJs = require("crypto-js");
const express = require("express");
const mysqlConnection = require('../db-connection');
const RouteAuth = express.Router();
const { generateToken, validateTokenThen, validateToken } = require("../helpers/jwt");
const { response200, response403 } = require("../helpers/responses");
const { algorithm, key, iv, plainText, secretKey } = require("../constants");
const { comparePassword } = require("../utils");
const { QUERY } = require("../query-constants");

const decipher = (body) => {
    const { password, nonce, tag } = body;

    const decipher = crypto.createDecipheriv(algorithm, key, iv, {
        authTagLength: 16,
    });

    const tagBuffer = Buffer.from(tag, "hex");
    decipher.setAuthTag(tagBuffer);

    const decryptedPassword = cryptoJs.AES.decrypt(password, nonce).toString(
        cryptoJs.enc.Utf8
    );

    const encryption = cryptoJs.AES.encrypt(
        decryptedPassword,
        secretKey
    ).toString();

    return { encryption };
};

RouteAuth.get("/", (req, res) => {
    res.send(`<div>
        <div>Route Auth</div>
    </div>`);
});

// get nonce route
RouteAuth.get("/get-nonce", (req, res) => {
    response200(res, `Nonce`, { nonce: 'sdfsdfsdfdffds' });
    // const cipher = crypto.createCipheriv(algorithm, key, iv, {
    //     authTagLength: 16,
    // });
    // const cipherUpdate = cipher.update(plainText, "utf8", "hex");
    // const nonce = cipherUpdate + cipher.final("hex");
    // const tag = cipher.getAuthTag().toString("hex");
    // response200(res, `Nonce`, { nonce, tag });
});

// login route
RouteAuth.post("/login", (req, res) => {
    const { username } = req.body;
    const { encryption } = decipher(req.body);
    mysqlConnection.query(QUERY.GET_USER_BY_EMAIL(username), function (error, results) {
        if (error) throw error;
        const [user] = results;
        const matching = comparePassword(encryption, secretKey, user);
        if (matching) {
            const { guid, first_name, last_name, email } = user;
            const jwt = generateToken(guid);
            response200(res, `User exists`, {
                data: { guid, name: `${first_name} ${last_name}`, username: email },
                jwt,
            });
        } else {
            response403(res, `Invalid credentials`);
        }
    });
});

// verify user route
RouteAuth.post("/verify", (req, res) => {
    validateTokenThen(req, res, () => {
        const { username } = req.body;
        const { encryption } = decipher(req.body);
        mysqlConnection.query(QUERY.GET_USER_BY_EMAIL(username), function (error, results) {
            if (error) throw error;
            const [user] = results;
            const matching = comparePassword(encryption, secretKey, user);
            if (matching) {
                response200(res, `User verified`, {});
            } else {
                response403(res, `Invalid credentials`);
            }
        });
    });
});

// verify token route
RouteAuth.get("/verify-token", (req, res) => {
    if (validateToken(req)) {
        response200(res, `User verified`);
    } else {
        response403(res, `Uder not verified`);
    }
});

module.exports = { RouteAuth, decipher };
