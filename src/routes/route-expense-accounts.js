const db = require('../config');
const express = require('express');
const RouteExpenseAccounts = express.Router();
const ExpenseAccountModel = require('../models/model-expense-account');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

// list accounts route
RouteExpenseAccounts.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        ExpenseAccountModel.find({}).exec((err, data) => {
            if(err) console.log(err);
            response200(res, data?.length ? 'Account list' : 'No accounts', { data });
        });
    });
});

// add account route
RouteExpenseAccounts.post('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, name, initialBalance, currentBalance, totalCredits, totalDebits, label, icon } = req.body;
        if(guid) {
            ExpenseAccountModel.updateOne({ guid }, { $set: { name, initialBalance, currentBalance, totalCredits, totalDebits, label, icon } }, (e, d) => {
                response200(res, `Account updated`, { data: d });
            })
        } else {
            ExpenseAccountModel.find({ name }, (err, data) => {
                if(data?.length) {
                    response401(res, `Account exists`);
                } else {
                    ExpenseAccountModel.create({ guid: generateGuid(), name, initialBalance, currentBalance, totalCredits, totalDebits, label, icon }, (e, d) => {
                        response200(res, `Account added`, { data: d });
                    });
                }
            });
        }
    });
});

module.exports = RouteExpenseAccounts