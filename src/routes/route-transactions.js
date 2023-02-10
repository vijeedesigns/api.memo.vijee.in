require('../config');
const express = require('express');
const RouteTransactions = express.Router();
const ExpenseModel = require('../models/model-expense');
const TransactionReviewModel = require('../models/model-transaction-review');
const { response200 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { generateGuid } = require('../utils');

// list transactions route
RouteTransactions.get('/:bank/:start/:end', (req, res) => {
    validateTokenThen(req, res, () => {
        const bank = req.params.bank;
        const startDate = new Date(req.params.start);
        const endDate = new Date(req.params.end).setDate(new Date(req.params.end).getDate()+1);

        let initialBalance = 0;
        // Setting initialBalance from type INITIAL
        ExpenseModel.find({account: bank, type: 'INITIAL'}).exec((err, account) => {
            if(err) console.log(err);
            initialBalance = account[0]?.amount;
            // Updating initialBalance from type CREDIT and DEBIT till prev month end
            ExpenseModel.find({account: bank, date: { $lt: startDate }}).exec((err, account) => {
                if(err) console.log(err);
                const creditList = account.filter(i=>i?.type==='CREDIT');
                creditList.forEach(i=>initialBalance=initialBalance+i?.amount);
                const debitList = account.filter(i=>i?.type==='DEBIT');
                debitList.forEach(i=>initialBalance=initialBalance-i?.amount);
                const totalCredits = creditList.reduce((sum, item) => sum + item?.amount, 0);
                const totalDebits = debitList.reduce((sum, item) => sum + item?.amount, 0);
                // Adding other conditions and returning data
                ExpenseModel.find({account: bank, date: {
                    $lt: endDate,
                    $gte: startDate
                }}).sort({date: 'asc'}).exec((err, account2) => {
                    if(err) console.log(err);            
                    const rangeCreditList = account2.filter(i=>i?.type==='CREDIT');
                    const rangeDebitList = account2.filter(i=>i?.type==='DEBIT');
                    const rangeTotalCredits = rangeCreditList.reduce((sum, item) => sum + item?.amount, 0);
                    const rangeTotalDebits = rangeDebitList.reduce((sum, item) => sum + item?.amount, 0);

                    const data = {
                        account: bank,
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

RouteTransactions.post('/review', (req, res) => {
    validateTokenThen(req, res, () => {
        const year = req?.body?.year;
        const month = req?.body?.month;
        TransactionReviewModel.findOne({year, month}).exec((err, data) => {
            if(data) {
                response200(res, 'Review found', { data });
            } else {
                TransactionReviewModel.create({
                    guid: generateGuid(),
                    year,
                    month,
                    credits: {
                        'All credits': ["lbkduubat6ystn21e9q", "lbm0riww7ycf3qwe3fu", "lbp6m8xfa72k2fetacu", "lbp6o96lnx25eel5rnk", "lbvr09u5i9yybnjma6", "lc20oeyi3in9bhth81r", "lc20sdqtv342dwujgz", "lc7h3v0g2kbhz53ivlo"]
                    },
                    debits: {
                        'All expenses': ["lc20t80cdox8vgtcd79", "lc20qqrlgy7ikdudtci", "lc20n15xesd8um4op89", "lbn44woo05iour3lhp38", "lblzknkvfxwjtd88bwk"],
                        'Purchases': ["lc2113sxau4arrft11u", "lc20zmsu7hq3qx3t5dq", "lc20w5m73tulaav9pwp", "lc20vo6npjmcjwjfol", "lc20ugiy95yb3l8glz5", "lbvr2ld65y9jd1wajdx", "lbp6n1j9emfju715l1w", "lbnohs135zjhovv1jbc", "lbkeig2d0uh5z7vs9xel", "lbkeh0t3z8rm1wnejb"],
                        'Non frequent': ["lbvrablvz7tp287o6l", "lbvr9iqtcwd1krlfgrf", "lbvr58r2h3uqi9bx565", "lbp6nlt8wzfmtk0onqk", "lbkeg5gguje9no4lrk", "lbkdwo0ngkyy02ioz5j"],
                        'Charges': ["lc21kouznykvkwgr90p", "lc21hiybcft1oihi50p"],
                        'LIC': ["lbm17wu9usludf3o00d", "lbm11t579t7p0esgoi"],
                        'Monthly': ["lbls4immz01m3vfnu1m", "lbkedyu1pzpdswqv0vc", "lbkdx7i3bpak75j6s4"],
                        'ATM withdrawal': ["lc21jam0fo20e67538a", "lbvr1rak3507nslaxit", "lbvr1ni7jhm2lv6fkyl", "lbvr1lpl7ecfhj1d1ia", "lbvr0zt2z9l3z8r04p", "lbkeera9fkjq8cht9e"],
                        'Fuel': ["lc2127crmsd2inyu1gb", "lbvr81comqscnqunib", "lbked1b6kr49qf0zghs", "lbkdxxvdlcnb8r8krgg"],
                        'Food & other': ["lc20yzj8w543u8jgwi9", "lc20xqhiqen7efj40q", "lc20m68mjr4iuuaa77g", "lbvrbek9yyk7nhtzp5b", "lbp6om624t1iibvm2bw", "lbkeeek4iyz4uzwsc2", "lbkeciwzdz0959pmjtk", "lbkdxlmvpok0k95rbli", "lc7gpsw995id918cf49", "lc7gsltqfnra1xp9mgm", "lc7gtg82cwu8rghd5xg"]
                    }
                }, (e, d) => {
                    response200(res, 'Review added', { data: d });
                })
            }
        })

        // ExpenseModel.updateMany({ type: "INITIAL" }, { $set: { reviewType: "All credits" } }, { upsert: true }).exec((err, data) => {
        //     console.log("data ", data);
        // })
        // ExpenseModel.updateMany({ type: "CREDIT" }, { $set: { reviewType: "All credits" } }, { upsert: true }).exec((err, data) => {
        //     console.log("data ", data);
        // })
        // ExpenseModel.updateMany({ type: "DEBIT" }, { $set: { reviewType: "All expenses" } }, { upsert: true }).exec((err, data) => {
        //     console.log("data ", data);
        // })        
    })
});

module.exports = RouteTransactions