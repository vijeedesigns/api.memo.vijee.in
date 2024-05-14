require('../config');
const express = require('express');
const RouteLocker = express.Router();
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const mysqlConnection = require('../db-connection');
const { QUERY } = require('../query-constants');

// list locker route
RouteLocker.get('/get-list', (req, res) => {
    validateTokenThen(req, res, () => {
        mysqlConnection.query(QUERY.GET_NOTES(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                return {
                    guid: item?.guid,
                    title: item?.title,
                    content: ''//JSON.parse(item?.content)
                }
            });
            response200(res, `Note list`, {result});
        });
    });
});

// add locker route
RouteLocker.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {
        const { title, content } = req.body;
        if(req?.body?.guid) {
            const { guid } = req?.body;
            mysqlConnection.query(QUERY.EDIT_NOTE(`SET title='${title}', content='${content}' WHERE guid='${guid}'`), function (error2, results) {
                if (error2) throw error2;
                if(!!results?.affectedRows) {
                    response200(res, `Note ${title} updated!`, { guid, title, content: JSON.parse(content) });
                }
            });
        } else {
            const guid = generateGuid();
            mysqlConnection.query(QUERY.ADD_NOTE(`(guid, title, content) VALUES ('${guid}','${title}','${content}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    response200(res, `Note ${title} created!`, { guid, title, content: JSON.parse(content) });
                }
            });
        }
    });
});

// remove locker route
RouteLocker.delete('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        if(!guid) {
            response401(res, `Please check request.`);
        } else {
            mysqlConnection.query(QUERY.GET_NOTE(guid), function (error, results) {
                if (error) throw error;
                const [note] = results;
                const { guid, title } = note;
                mysqlConnection.query(QUERY.DELETE_NOTE(guid), function (error, result) {
                    if (error) throw error;
                    if(!!result?.affectedRows) {
                        response200(res, `Note ${title} deleted!`, { guid, title });
                    }
                });
            });
        }
    });
});

module.exports = RouteLocker
