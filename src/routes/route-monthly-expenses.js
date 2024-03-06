const db = require('../config');
const express = require('express');
const RouteMonthlyExpenses = express.Router();
const { generateGuid, prePad, jsDateToMySqlDate } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const mysqlConnection = require('../db-connection');
const { QUERY } = require('../query-constants');

// list expenses route
RouteMonthlyExpenses.get('/get-list', (req, res) => {
    validateTokenThen(req, res, () => {
        const year = req.query.y || 2023;
        const month = req.query.m || 12;

        mysqlConnection.query(QUERY.GET_MONTHLY_EXPENSE_STATUS_WITH_YEAR_AND_MONTH(month, year), function (error, results) {
            if (error) throw error;
            if(results?.length) {
                const [statusData] = results;
                getExpenseData(statusData);
            } else {
                const guid = generateGuid();
                mysqlConnection.query(QUERY.ADD_MONTHLY_EXPENSE_STATUS(`(guid,month,year,valueIds) VALUES ('${guid}','${month}','${year}','[]')`), function (error, results) {
                    if (error) throw error;
                    if(!!results?.affectedRows) {
                        getExpenseData({ guid, month, year, valueIds: [] });
                    }
                });
            }
        });

        const getExpenseData = statusData => {
            mysqlConnection.query(QUERY.GET_MONTHLY_EXPENSES(), function (error, results) {
                if (error) throw error;
                const result = results?.map(item => {
                    return {
                        guid: item?.guid,
                        name: item?.name,
                        amount: Number(item?.amount),
                        dueDate: item?.dueDate,
                        startDate: item?.startDate,
                        endDate: item?.endDate,
                        months: JSON.parse(item?.months),
                        paid: statusData?.valueIds.includes(item?.guid)
                    }
                })?.filter(item => {
                    const monthsMatch = item?.months?.indexOf(Number(month)) > -1;
                    const startDate = new Date(item?.startDate);
                    const endDate = new Date(item?.endDate);
                    const startMonthYear = Number(`${startDate.getFullYear()}${prePad(startDate.getMonth())}`);
                    const endMonthYear = Number(`${endDate.getFullYear()}${prePad(endDate.getMonth())}`);
                    const monthYear = Number(`${year}${prePad(month)}`);
                    return monthsMatch && monthYear >= startMonthYear && monthYear <= endMonthYear;
                });
                response200(res, `Expense list`, {result});
            });
        }
    });
});

// add edit expense route
RouteMonthlyExpenses.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, name, amount, dueDate, startDate, endDate, months } = req.body;
        if(guid) {
            mysqlConnection.query(QUERY.EDIT_MONTHLY_EXPENSE(`SET name='${name}', amount='${amount}', dueDate='${dueDate}', startDate='${jsDateToMySqlDate(startDate)}', endDate='${jsDateToMySqlDate(endDate)}', months='${months}' WHERE guid='${guid}'`), function (error2, results) {
                if (error2) throw error2;
                if(!!results?.affectedRows) {
                    response200(res, `Expense ${name} updated!`, { guid, name, amount, dueDate, startDate, endDate, months });
                }
            });
        } else {
            const guid = generateGuid();
            mysqlConnection.query(QUERY.ADD_MONTHLY_EXPENSE(`(guid, name, amount, dueDate, startDate, endDate, months) VALUES ('${guid}','${name}','${amount}','${dueDate}','${jsDateToMySqlDate(startDate)}','${jsDateToMySqlDate(endDate)}','${JSON.stringify(months)}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    response200(res, `Expense ${name} created!`, { guid, name, amount, dueDate, startDate, endDate, months });
                }
            });
        }
    });
});

// update status route
RouteMonthlyExpenses.post('/update-status', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid, month, year } = req.body;
        mysqlConnection.query(QUERY.GET_MONTHLY_EXPENSE_STATUS_WITH_YEAR_AND_MONTH(month, year), function (error, results) {
            if (error) throw error;
            if(results?.length) {
                const [data] = results;
                if(data?.guid) {
                    const valueIdsJson = JSON.parse(data?.valueIds);
                    const valueIds = valueIdsJson?.includes(guid) ? valueIdsJson?.filter(i => i !== guid) : [...valueIdsJson, guid];
                    mysqlConnection.query(QUERY.EDIT_MONTHLY_EXPENSE_STATUS(`SET valueIds='${JSON.stringify(valueIds)}' WHERE year='${year}' AND month='${month}'`), function (error2, results2) {
                        if (error2) throw error2;
                        if(!!results2?.affectedRows) {
                            response200(res, `Expense status updated!`, { guid, month, year, valueIds });
                        }
                    });
                } else {
                    const guid = generateGuid();
                    mysqlConnection.query(QUERY.ADD_MONTHLY_EXPENSE_STATUS(`(guid, month, year, valueIds) VALUES ('${guid}','${month}','${year}','[${guid}]')`), function (error, results3) {
                        if (error) throw error;
                        if(!!results3?.affectedRows) {
                            response200(res, `Expense status created!`, { guid, month, year, valueIds });
                        }
                    });
                }
            }
        });
    });
});

// remove route
RouteMonthlyExpenses.delete('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        if(!guid) {
            response401(res, `Please check request.`);
        } else {
            mysqlConnection.query(QUERY.GET_MONTHLY_EXPENSE(guid), function (error, results) {
                if (error) throw error;
                const [monthlyExpense] = results;
                const { guid, name } = monthlyExpense;
                mysqlConnection.query(QUERY.DELETE_MONTHLY_EXPENSE(guid), function (error, result) {
                    if (error) throw error;
                    if(!!result?.affectedRows) {
                        response200(res, `Monthly expense for ${name} deleted!`, { guid, name });
                    }
                });
            });
        }
    });
});

module.exports = RouteMonthlyExpenses
