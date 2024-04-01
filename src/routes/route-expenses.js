const db = require('../config');
const express = require('express');
const RouteExpenses = express.Router();
const ExpenseModel = require('../models/model-expense');
const ExpenseAccountModel = require('../models/model-expense-account');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

// list expenses route
RouteExpenses.post('/all', (req, res) => {
    validateTokenThen(req, res, () => {
        const { account, page, pageCount } = req.body;
        ExpenseAccountModel.findOne({name: account}).exec((err, expenseAccount) => {
            if(err) console.log(err);
            ExpenseModel.find({account}).sort({date: 'desc'}).skip((page-1)*pageCount).limit(pageCount).exec((err, accounts) => {
                if(err) console.log(err);
                response200(res, accounts?.length ? 'Expense list' : 'No expenses', { 
                    data: accounts, 
                    totalCredits: expenseAccount?.totalCredits, 
                    totalDebits: expenseAccount?.totalDebits, 
                    initialBalance: expenseAccount?.initialBalance, 
                    currentBalance: expenseAccount?.currentBalance,
                    account
                });
            });
        });
    });
});

// add expense route
RouteExpenses.post('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, account, date, time, type, amount, comment, reviewType } = req.body;
        if(guid) {
            ExpenseModel.updateOne({ guid }, { $set: { reviewType, amount, comment, date, time } }, (e, d) => {
                updateExpenseAccountModel(account, dd => {
                    response200(res, `Expense updated`, { data: dd });
                });
            });
        } else {
            ExpenseModel.find({ account, date, time, type, amount, comment }, (err, data) => {
                if(data?.length) {
                    response401(res, `Expense exists`);
                } else {
                    const fields = { guid: generateGuid(), account, date, time, type, amount, comment, reviewType };
                    ExpenseModel.create(fields, (e, d) => {
                        updateExpenseAccountModel(account, dd => {
                            response200(res, `Expense added`, { data: {
                                ...fields,
                                ...dd
                            } });
                        });
                    });
                }
            });
        }
    });
});

// delete expense route
RouteExpenses.delete('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid, account, date, time, type, amount, comment, reviewType } = req.body;
        if(guid) {
            ExpenseModel.deleteOne({ guid }, (e, d) => {
                if(d?.deletedCount === 1) {
                    updateExpenseAccountModel(account, dd => {
                        response200(res, `Expense deleted!`, { data: {
                            guid, account, date, time, type, amount, comment, reviewType
                        } });
                    });
                } else {
                    response401(res, `Expense not deleted!`);
                }
            });
        } else {
            response401(res, `Expense not found!`);
        }
    });
});

const updateExpenseAccountModel = (account, callback=()=>{}) => {
    ExpenseModel.find({account, type: 'INITIAL'}).exec((err, bank) => {
        if(err) console.log(err);
        const initialBalance = bank[0]?.amount;
        let balanaceAmount = 0;
        ExpenseModel.find({account}).sort({date: 'asc'}).exec((err, accounts) => {
            if(err) console.log(err);
            const creditList = accounts.filter(i=>i?.type==='CREDIT');
            creditList.forEach(i=>balanaceAmount=balanaceAmount+i?.amount);
            const totalCredits = creditList.reduce((sum, item) => sum + item?.amount, 0);
            const debitList = accounts.filter(i=>i?.type==='DEBIT');
            debitList.forEach(i=>balanaceAmount=balanaceAmount-i?.amount);
            const totalDebits = debitList.reduce((sum, item) => sum + item?.amount, 0);
            const fields = {
                totalCredits, 
                totalDebits, 
                initialBalance, 
                currentBalance: (initialBalance + totalCredits) - totalDebits
            };
            ExpenseAccountModel.updateOne({name: account}, { $set: { ...fields } }, (e, d) => {
                callback(fields);
            })
        });
    });
}

module.exports = RouteExpenses
