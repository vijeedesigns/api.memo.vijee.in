require('../config');
const express = require('express');
const RouteLocker = express.Router();
const { response200 } = require('../helpers/responses');

// list locker route
RouteLocker.get('/', (req, res) => {
    response200(res, 'Locker list', { data: [
        {
            "guid": "ghd5764sdsd97",
            "username": "vijeedesigns@gmail.com",
            "password": "Help4work1",
            "url": "https://icomoon.io/app/#/select",
            "title": "Icomoon"
        },
        {
            "guid": "ghdhgfg5764sdsd97",
            "username": null,
            "password": null,
            "url": "https://react-iconly.jrgarciadev.com",
            "title": "React Iconly"
        },
        {
            "guid": "ghdhgf764sdsd97",
            "username": null,
            "password": null,
            "url": "https://qastcorpdevwebeastus2.z20.web.core.windows.net/docs/banyan-web-style-guide/index.html",
            "title": "Banyan UI documentation"    
        },
        {
            "guid": "ghd5764sdsd97dd",
            "username": "vijeedesigns@gmail.com",
            "password": "@weather123",
            "url": "https://www.weatherapi.com/",
            "title": "Weather API"
        },
        {
            "guid": "ghd5764sdsd97dfdfsd",
            "title": "HDFC RD",
            "note": "Deposit Amount( In Rs.): 5000.00\nInstallment Amount( In Rs.): 5000.00\nDeposit Start Date: 27 Feb 2021\nPeriod of Deposit(in Months): 24 Month(s)\nRate of Interest(%p.a.): 4.90\nDeposit Maturity Date: 27 Feb 2023\nMaturity + Amount (in Rs.): 126318.00"
        },
        {
            "guid": "gh764sdsd97dfdfsd",
            "title": "Xiaomi MI",
            "username": "vijeedesigns@gmail.com",
            "password": "123@asdfgh1",
            "note": "Account ID: 1640654242\nMobile number: 9747953832\nSecond space: 4268258"
        }
    ] });
});

module.exports = RouteLocker
