require('../config');
const express = require('express');
const RouteCompanies = express.Router();
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const mysqlConnection = require('../db-connection');
const { QUERY } = require('../query-constants');

// list companies route
RouteCompanies.get('/get-list', (req, res) => {
    validateTokenThen(req, res, () => {
        mysqlConnection.query(QUERY.GET_COMPANIES(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                return {
                    guid: item?.guid,
                    name: item?.name,
                    datefrom: item?.datefrom,
                    dateto: item?.dateto,
                    type: item?.type,
                    role: item?.role,
                    tag: item?.tag,
                    color: item?.color
                }
            });
            response200(res, `Companies list`, {result});
        });
    });
});

// add edit company route
RouteCompanies.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, name, datefrom, dateto, type, role, tag, color } = req.body;
        if(guid) {
            mysqlConnection.query(QUERY.EDIT_COMPANY(`SET name='${name}', datefrom='${datefrom}', dateto='${dateto}', type='${type}', role='${role}', tag='${tag}', color='${color}' WHERE guid='${guid}'`), function (error2, results) {
                if (error2) throw error2;
                if(!!results?.affectedRows) {
                    response200(res, `Company ${name} updated!`, { guid, name, datefrom, dateto, type, role, tag, color });
                }
            });
        } else {
            const guid = generateGuid();
            mysqlConnection.query(QUERY.ADD_COMPANY(`(guid, name, datefrom, dateto, type, role, tag, color) VALUES ('${guid}','${name}','${datefrom}','${dateto}','${type}','${role}','${tag}','${color}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    response200(res, `Company ${name} created!`, { guid, name, datefrom, dateto, type, role, tag, color });
                }
            });
        }
    });
});

// remove company route
RouteCompanies.post('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        if(!guid) {
            response401(res, `Please check request.`);
        } else {
            mysqlConnection.query(QUERY.GET_COMPANY(guid), function (error, results) {
                if (error) throw error;
                const [company] = results;
                const { guid, name, datefrom, dateto, type, role, tag, color } = company;
                mysqlConnection.query(QUERY.DELETE_COMPANY(guid), function (error, result) {
                    if (error) throw error;
                    if(!!result?.affectedRows) {
                        response200(res, `Company ${name} deleted!`, { guid, name, datefrom, dateto, type, role, tag, color });
                    }
                });
            });
        }
    });
});

module.exports = RouteCompanies
