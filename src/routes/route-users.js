require('../config');
const cryptoJs = require('crypto-js');
const express = require('express');
const RouteUsers = express.Router();
const UserModel = require('../models/model-user');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { secretKey } = require('../constants');

// list users route
RouteUsers.get('/', (req, res) => {
    UserModel.find({}, (err, data) => {
        if(err) console.log(err);
        response200(res, data?.length ? 'User list' : 'No users', { data });
    });
});

// add user route
RouteUsers.post('/', (req, res) => {
    const { name, username, status } = req.body;
    UserModel.find({ username }, (err, data) => {
        if(data?.length) {
            response401(res, `User exists`);
        } else {
            const encryption = cryptoJs.AES.encrypt(decryptedPassword, secretKey).toString();
            UserModel.create({ guid: generateGuid(), name, username, password: encryption, status }, (e, d) => {
                response200(res, `User added`, { data: d });
            });
        }
    });
});

module.exports = RouteUsers
