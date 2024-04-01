require('../config');
const express = require('express');
const RouteTransactions = express.Router();
const ExpenseModel = require('../models/model-expense');
const { response200 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

// list transactions route
RouteTransactions.get('/:bank/:start/:end', (req, res) => {
    validateTokenThen(req, res, () => {
        const requestBank = req.params.bank;
        const bank = requestBank === 'all' ? {} : { account: requestBank };
        const startDate = new Date(req.params.start);
        const endDate = new Date(req.params.end).setDate(new Date(req.params.end).getDate()+1);

        let initialBalance = 0;
        // Setting initialBalance from type INITIAL
        ExpenseModel.find({...bank, type: 'INITIAL'}).exec((err, account) => {
            if(err) console.log(err);
            initialBalance = account[0]?.amount;
            // Updating initialBalance from type CREDIT and DEBIT till prev month end
            ExpenseModel.find({...bank, date: { $lt: startDate }}).exec((err, account) => {
                if(err) console.log(err);
                const creditList = account.filter(i=>i?.type==='CREDIT');
                creditList.forEach(i=>initialBalance=initialBalance+i?.amount);
                const debitList = account.filter(i=>i?.type==='DEBIT');
                debitList.forEach(i=>initialBalance=initialBalance-i?.amount);
                const totalCredits = creditList.reduce((sum, item) => sum + item?.amount, 0);
                const totalDebits = debitList.reduce((sum, item) => sum + item?.amount, 0);
                // Adding other conditions and returning data
                ExpenseModel.find({...bank, date: {
                    $lt: endDate,
                    $gte: startDate
                }}).sort({date: 'asc'}).exec((err, account2) => {
                    if(err) console.log(err);            
                    const rangeCreditList = account2.filter(i=>i?.type==='CREDIT');
                    const rangeDebitList = account2.filter(i=>i?.type==='DEBIT');
                    const rangeTotalCredits = rangeCreditList.reduce((sum, item) => sum + item?.amount, 0);
                    const rangeTotalDebits = rangeDebitList.reduce((sum, item) => sum + item?.amount, 0);

                    const data = {
                        account: requestBank,
                        from: new Date(startDate),
                        to: new Date(endDate),
                        initialBalance,
                        currentBalance: (initialBalance + rangeTotalCredits) - rangeTotalDebits,
                        totalCredits,
                        totalDebits,
                        rangeTotalCredits,
                        rangeTotalDebits,
                        credits: rangeCreditList,
                        debits: rangeDebitList
                    }

                    response200(res, account?.length ? 'Transactions data' : 'No Transactions', { data });
                });
            });
        });
    });
});

module.exports = RouteTransactions