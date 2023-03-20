require('../config');
const cryptoJs = require('crypto-js');
const sendmail = require('sendmail')({silent: true});
const express = require('express');
const RouteUsers = express.Router();
const UserModel = require('../models/model-user');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { secretKey } = require('../constants');
const { decipher } = require('./route-auth');
const { validateTokenThen } = require('../helpers/jwt');

// list users route
RouteUsers.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        UserModel.find({}, (err, data) => {
            if(err) console.log(err);
            response200(res, data?.length ? 'User list' : 'No users', { data });
        });
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

RouteUsers.post('/forgot', (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ username: email }, (err, data) => {
        if(data) {
            const dt = new Date();
            dt.setTime(dt.getTime()+(60*60*1000));
            const resetId = generateGuid();
            UserModel.updateOne({ username: email }, { $set: { resetId, resetValidTo: dt } }, (err, docs) => {
                if (err){
                    response401(res, `Something went wrong!`);
                }
                else {
                    sendmail({
                        from: 'no-reply@yourdomain.com',
                        to: email,
                        subject: 'test sendmail',
                        html: `That was easy! ${resetId}`
                    }, function(err, reply) {
                        if (err) {
                            response401(res, err);
                        } else {
                            response200(res, 'Mail sent!', { data: { resetId } });
                        }
                    });
                }
            });
        } else {
            response401(res, `Something went wrong!`);
        }
    });
});

RouteUsers.post('/reset', (req, res) => {
    const { resetId } = req.body;
    const { nonceMatching, encryption } = decipher(req.body);
    if(nonceMatching) {
        UserModel.findOne({ resetId }, (err, data) => {
            if(data) {
                UserModel.updateOne({ resetId }, { $set: { password: encryption, resetId: '', resetValidTo: '' } }, (err, docs) => {
                    if (err){
                        response401(res, `Something went wrong!`);
                    }
                    else {
                        response200(res, 'Mail sent!', { data: { resetId } });
                    }
                });
            } else {
                response401(res, `Something went wrong!`);
            }
        });
    } else {
        response403(res, `Invalid credentials`);
    }
});

module.exports = RouteUsers
