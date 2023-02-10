require('../config');
const express = require('express');
const fs = require('fs');
const RoutePayslips = express.Router();
const { response200, response403 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { generateGuid } = require('../utils');
const { payslipsPath } = require('../constants');

RoutePayslips.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const files = fs.readdirSync(payslipsPath);
        if(files?.length) {
            const newFiles = files?.map(file => {
                return {
                    guid: generateGuid(),
                    file
                }
            });
            response200(res, 'File list', { result: newFiles.sort().reverse() });
        } else {            
            response403(res, 'No files');
        }
    });
});

module.exports = RoutePayslips;