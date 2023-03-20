const db = require('../config');
const express = require('express');
const RouteExpenses = express.Router();
const ExpenseModel = require('../models/model-expense');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

// list expenses route
RouteExpenses.get('/:account', (req, res) => {
    validateTokenThen(req, res, () => {
        const account = req.params.account;
        ExpenseModel.find({account}).sort({date: 'asc'}).exec((err, account) => {
            if(err) console.log(err);
            const list = account.map((item, index) => {
                const listTillItem = account.slice(0, index);
                const tiilItemBalance = listTillItem?.length ? listTillItem.reduce((total, {type, amount}) => type === 'DEBIT' ? total - amount : total + amount, 0) : 0;
                const newItem = {...item?._doc, balance: item?.type === 'DEBIT' ? tiilItemBalance - item?.amount : tiilItemBalance + item?.amount}
                delete newItem._id;
                delete newItem.__v;
                return newItem;
            });
            response200(res, list?.length ? 'Expense list' : 'No expenses', { data: list.reverse() });
        });
    });
});

// add expense route
RouteExpenses.post('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, account, date, time, type, amount, comment, reviewType } = req.body;
        if(guid) {
            ExpenseModel.updateOne({ guid }, { $set: { reviewType } }, (e, d) => {
                response200(res, `Expense updated`, { data: d });
            })
        } else {
            ExpenseModel.find({ account, date, time, type, amount, comment }, (err, data) => {
                if(data?.length) {
                    response401(res, `Expense exists`);
                } else {
                    ExpenseModel.create({ guid: generateGuid(), account, date, time, type, amount, comment, reviewType }, (e, d) => {
                        response200(res, `Expense added`, { data: d });
                    });
                }
            });
        }
    });
});

module.exports = RouteExpenses