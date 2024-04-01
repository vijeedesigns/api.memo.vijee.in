require('../config');
const express = require('express');
const RouteExcels = express.Router();
const mysqlConnection = require('../db-connection');
const { response200 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { QUERY } = require('../query-constants');
const fs = require('fs');

// list excels route
RouteExcels.get('/get-excels', (req, res) => {
    validateTokenThen(req, res, () => {
        mysqlConnection.query(QUERY.GET_EXCELS(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                const data = JSON.parse(item?.data);
                return {
                    guid: item?.guid,
                    name: item?.name,
                    ...data,
                }
            });
            response200(res, `Excels list`, {result});
        });
    });
});

// add update excel route
RouteExcels.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {
        if(req?.body?.guid) {
            const { guid, name, data } = req.body;
            mysqlConnection.query(QUERY.EDIT_EXCEL(`SET name='${name}', data='${JSON.stringify(data)}' WHERE guid='${guid}'`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    response200(res, `Excel ${name} updated!`, { guid, name, ...data });
                }
            });
        }
    });
});

module.exports = RouteExcels
