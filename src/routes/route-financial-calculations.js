require('../config');
const express = require('express');
const RouteFinancialCalculation = express.Router();
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const mysqlConnection = require('../db-connection');
const { QUERY } = require('../query-constants');

// list financial calculations route
RouteFinancialCalculation.get('/get-list', (req, res) => {
    validateTokenThen(req, res, () => {
        mysqlConnection.query(QUERY.GET_FINANCIAL_CALCULATIONS(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                return {                    
                    guid: item?.guid,                    
                    title: item?.title,                    
                    description: item?.description,                    
                    emi: item?.emi,                    
                    frequency: item?.frequency,                    
                    interestRate: item?.interestRate,                    
                    ROIChange: item?.ROIChange,                    
                    tenure: item?.tenure,                    
                    type: item?.type,                    
                    loanAmount: item?.loanAmount
                }
            });
            response200(res, `Financial calculation list`, {result});
        });
    });
});

// add edit financial calculation route
RouteFinancialCalculation.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, type, title, description, emi, frequency, interestRate, tenure, loanAmount, ROIChange } = req.body;
        if(guid) {
            mysqlConnection.query(QUERY.EDIT_FINANCIAL_CALCULATION(`SET type='${type}', title='${title}', description='${description}', emi='${emi}', frequency='${frequency}', interestRate='${interestRate}', tenure='${tenure}', loanAmount='${Number(loanAmount)}', ROIChange='${Number(ROIChange)}' WHERE guid='${guid}'`), function (error2, results) {
                if (error2) throw error2;
                if(!!results?.affectedRows) {
                    response200(res, `Financial calculation ${title} updated!`, { guid, type, title, description, emi, frequency, interestRate, tenure, loanAmount, ROIChange });
                }
            });
        } else {
            const guid = generateGuid();
            mysqlConnection.query(QUERY.ADD_FINANCIAL_CALCULATION(`(guid, type, title, description, emi, frequency, interestRate, tenure, loanAmount, ROIChange) VALUES ('${guid}','${type}','${title}','${description}','${emi}','${frequency}','${interestRate}','${tenure}','${Number(loanAmount)}','${Number(ROIChange)}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    response200(res, `Financial calculation ${title} created!`, { guid, type, title, description, emi, frequency, interestRate, tenure, loanAmount, ROIChange });
                }
            });
        }
    });
});

// remove financial calculation route
RouteFinancialCalculation.delete('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        if(!guid) {
            response401(res, `Please check request.`);
        } else {
            mysqlConnection.query(QUERY.GET_FINANCIAL_CALCULATION(guid), function (error, results) {
                if (error) throw error;
                const [financialCalculation] = results;
                const { guid, type, title, description, emi, frequency, interestRate, tenure, loanAmount, ROIChange } = financialCalculation;
                mysqlConnection.query(QUERY.DELETE_FINANCIAL_CALCULATION(guid), function (error, result) {
                    if (error) throw error;
                    if(!!result?.affectedRows) {
                        response200(res, `Financial calculation ${title} deleted!`, { guid, type, title, description, emi, frequency, interestRate, tenure, loanAmount, ROIChange });
                    }
                });
            });
        }
    });
});

module.exports = RouteFinancialCalculation
