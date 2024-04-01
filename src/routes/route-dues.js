require('../config');
const express = require('express');
const RouteDues = express.Router();
const mysqlConnection = require('../db-connection');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { QUERY } = require('../query-constants');

// list dues route
RouteDues.get('/get-dues', (req, res) => {
    validateTokenThen(req, res, () => {
        mysqlConnection.query(QUERY.GET_DUES(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                return {
                    guid: item?.guid,
                    person: item?.person,
                    amount: Number(item?.amount),
                    reason: item?.reason,
                    date: item?.date,
                    isPaid: item?.isPaid === "true"
                }
            });
            response200(res, `Dues list`, {result});
        });
    });
});

// add due route
RouteDues.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {
        const { person, amount, reason, date, isPaid } = req.body;
        if(req?.body?.guid) {
            const { guid } = req?.body;
            mysqlConnection.query(QUERY.EDIT_DUE(`SET person='${person}', amount='${amount}', reason='${reason}', date='${date}', isPaid='${isPaid?"true":"false"}' WHERE guid='${guid}'`), function (error2, results) {
                if (error2) throw error2;
                if(!!results?.affectedRows) {
                    response200(res, `Due ${person} updated!`, { guid, person, amount, reason, date, isPaid });
                }
            });
        } else {
            const guid = generateGuid();
            mysqlConnection.query(QUERY.ADD_DUE(`(guid, person, amount, reason, date, isPaid) VALUES ('${guid}','${person}','${parseInt(amount)}','${reason}','${date}','${isPaid?"true":"false"}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    response200(res, `Due ${person} created!`, { guid, person, amount, reason, date, isPaid });
                }
            });
        }
    });
});

// remove due route
RouteDues.delete('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        if(!guid) {
            response401(res, `Please check request.`);
        } else {
            mysqlConnection.query(QUERY.GET_DUE(guid), function (error, results) {
                if (error) throw error;
                const [due] = results;
                const { guid, person, amount, reason, date, isPaid } = due;
                mysqlConnection.query(QUERY.DELETE_DUE(guid), function (error, result) {
                    if (error) throw error;
                    if(!!result?.affectedRows) {
                        response200(res, `Due ${person} for ${amount} deleted!`, { guid, person, amount, reason, date, isPaid });
                    }
                });
            });
        }
    });
});

module.exports = RouteDues
