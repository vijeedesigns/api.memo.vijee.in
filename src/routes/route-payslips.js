require('../config');
const express = require('express');
const RoutePayslips = express.Router();
const { response200, response403 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const path = require("path");
const multer = require('multer');
const { diskStorage } = require('multer');
const fs = require('fs');
const mysqlConnection = require('../db-connection');
const { QUERY } = require('../query-constants');
const { generateGuid, jsDateToMySqlDate } = require('../utils');

const storage = diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(`${appRoot}/assets/uploads/payslips`));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage });

// list payslips route
RoutePayslips.get('/get-list', (req, res) => {
    validateTokenThen(req, res, () => {
        mysqlConnection.query(QUERY.GET_PAYSLIPS(), function (error, results) {
            if (error) throw error;
            const result = results?.sort((a,b)=>new Date(b?.date).getTime()-new Date(a?.date).getTime())?.map(item => {
                return {
                    guid: item?.guid,
                    url: item?.url,
                    company: item?.company,
                    date: item?.date,
                    ctc: Number(item?.ctc),
                    net: Number(item?.net)
                }
            });
            response200(res, `Payslip list`, {result});
        });
    });
});

// add payslips data route
RoutePayslips.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, async () => {
        const responseArr = [];
        await req?.body?.map(async payslipDoc => {
            const guid = generateGuid();
            const { url, company, date, ctc, net } = payslipDoc;
            await mysqlConnection.query(QUERY.ADD_PAYSLIP(`(guid, url, company, date, ctc, net) VALUES ('${guid}','${url}','${company}','${jsDateToMySqlDate(date)}','${ctc}','${net}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    responseArr.push({ guid, url, company, date, ctc, net });
                }
            });
        });
        response200(res, `Payslip created!`, responseArr);
    });
});

// cancel add payslips data route
RoutePayslips.post('/cancel', (req, res) => {
    validateTokenThen(req, res, () => {
        const files = req?.body?.map(file => `${appRoot}/assets/uploads/payslips/${file}`);
        files.forEach(file => {
            fs.unlinkSync(file);
        });
        response200(res, 'Payslips files removed', { data: req.body });
    });
});

// add payslips files route
RoutePayslips.post('/uploads', upload.array('image'), (req, res) => {
    try {
        const { files } = req;
        response200(res, 'File list', { data: { success: true, status: 200, message: 'File uploaded', files } });
    } catch (err) {
        response403(res, 'Please choose a file');
    }
});

module.exports = RoutePayslips;
