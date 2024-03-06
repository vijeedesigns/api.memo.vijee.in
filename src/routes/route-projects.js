require('../config');
const express = require('express');
const RouteProjects = express.Router();
const { response200 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const fs = require('fs');
const path = require('path');
const mysqlConnection = require('../db-connection');
const { QUERY } = require('../query-constants');

// list projects route
RouteProjects.get('/get-list', (req, res) => {
    validateTokenThen(req, res, async () => {
        mysqlConnection.query(QUERY.GET_PROJECTS(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                return {
                    guid: item?.guid,
                    name: item?.name,
                    website: item?.website,
                    iswebsiteactive: item?.iswebsiteactive,
                    comment: item?.comment,
                    company: item?.company,
                    duration: item?.duration,
                    description: item?.description,
                }
            });
            response200(res, `Project list`, {result});
        });      
    }); 
});

module.exports = RouteProjects;
