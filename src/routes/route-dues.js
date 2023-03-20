require('../config');
const express = require('express');
const RouteDues = express.Router();
const DueModel = require('../models/model-due');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

// list dues route
RouteDues.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        DueModel.find({}, (err, data) => {
            if(err) console.log(err);
            response200(res, data?.length ? 'Due list' : 'No dues', { data });
        });
    });
});

// add due route
RouteDues.post('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, to, amount, reason, date, isPaid } = req.body;
        if(!guid) {
            DueModel.find({ to, amount, reason, date, isPaid }, (err, data) => {
                if(data?.length) {
                    response401(res, `Due exists`);
                } else {
                    DueModel.create({ guid: generateGuid(), to, amount, reason, date, isPaid }, (e, d) => {
                        response200(res, `Due added`, { data: d });
                    });
                }
            });
        } else {
            DueModel.updateOne({ guid }, { $set: { to, amount, reason, date, isPaid } }, (err, docs) => {
                if (err){
                    response401(res, err);
                }
                else {
                    response200(res, `Due updated`, { data: { guid, to, amount, reason, date, isPaid } });
                }
            });
        }
    });
});

// remove due route
RouteDues.delete('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        if(!guid) {
            response401(res, `Please check request.`);
        } else {
            DueModel.deleteOne({ guid }, () => {
                response200(res, 'Due deleted', { data: { guid } });
            });
        }
    });
});

module.exports = RouteDues
