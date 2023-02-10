const db = require('../config');
const express = require('express');
const RouteExpenses = express.Router();
const ExpenseModel = require('../models/model-expense');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');

const mockExpenses = require('../../data/memo-expenses.json');

// list expenses route
RouteExpenses.get('/:account', (req, res) => {
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

// add expense route
RouteExpenses.post('/', (req, res) => {
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

// bulk add expenses route
RouteExpenses.post('/bulk-upload', (req, res) => {
    const collections = db.collections;
    collections['memo-expenses'].deleteMany();

    mockExpenses.forEach(expense => {
        const newExpense = {
            guid: generateGuid(),
            ...expense,
            date: new Date(new Date(expense?.date).setMinutes(expense?.time))
        }
        delete newExpense.time;
        ExpenseModel.create(newExpense, (e,d) => {
            console.log("d ", d, newExpense?.type);
        });
    });
})

module.exports = RouteExpenses