require('../config');
const express = require('express');
const RouteCompanies = express.Router();
const CompanyModel = require('../models/model-company');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

// list companies route
RouteCompanies.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        CompanyModel.find({}).sort({from: 'desc'}).exec((err, data) => {
            if(err) console.log(err);
            response200(res, data?.length ? 'Company list' : 'No companies', { data });
        });
    });
});

// add company route
RouteCompanies.post('/add', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, name, from, to, type, role, tag, color } = req.body;
        const fields = { name, from, to, type, role, tag, color };
        CompanyModel.findOne({ guid }, (err, data) => {
            if(err) throw err;
            if(data) {
                CompanyModel.updateOne({ guid }, { $set: { ...fields } }, (err, docs) => {
                    if (err){
                        console.log(err)
                    }
                    else {
                        response200(res, `Company updated`, { data: { guid, ...fields } });
                    }
                });
            } else {
                CompanyModel.find({ ...fields }, (err, data) => {
                    if(err) throw err;
                    if(data?.length) {
                        response401(res, `Company exists`);
                    } else {
                        CompanyModel.create({ guid: generateGuid(), ...fields }, (e, d) => {
                            response200(res, `Company added`, { data: d });
                        });
                    }
                });
            }
        });
    });
});

// remove company route
RouteCompanies.post('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        CompanyModel.deleteOne({ guid }, (err, data) => {
            response200(res, 'Company deleted', { data: { guid } });
        })
    });
});

module.exports = RouteCompanies
