require('../config');
const express = require('express');
const RouteContacts = express.Router();
const mysqlConnection = require('../db-connection');
const { generateGuid, isBase64 } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { QUERY } = require('../query-constants');
const fs = require('fs');

// list contacts route
RouteContacts.get('/get-contacts', (req, res) => {
    validateTokenThen(req, res, () => {
        mysqlConnection.query(QUERY.GET_CONTACTS(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                return {
                    numbers: JSON.parse(item?.numbers),
                    emails: JSON.parse(item?.emails),
                    guid: item?.guid,
                    name: item?.name,
                    gender: item?.gender,
                    photo: item?.photo && item?.photo !== '' ? `contacts/${item?.photo}` : '',
                    dob: item?.dob,
                    anniversary: item?.anniversary,
                    latlng: item?.latlng
                }
            });
            response200(res, `Contacts list`, {result});
        });
    });
});

// add contact route
RouteContacts.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {
        if(req?.body?.guid) {
            const { guid, name, gender, numbers, photo, emails, dob, anniversary, latlng="" } = req.body;
            
            mysqlConnection.query(QUERY.GET_CONTACT(guid), function (error, results) {
                let uploadedpath = results[0]?.photo || '';

                if(photo && photo !== '' && isBase64(photo)) {
                    uploadedpath = `assets/uploads/contacts/${guid}.png`;
                    fs.writeFileSync(uploadedpath, new Buffer.from(photo?.replace(/^data:image\/\w+;base64,/, ""), 'base64'));
                }

                mysqlConnection.query(QUERY.EDIT_CONTACT(`SET name='${name}', gender='${gender}', numbers='${JSON.stringify(numbers)}', photo='${uploadedpath.replace('assets/uploads/contacts/','')}', emails='${JSON.stringify(emails)}', dob='${dob}', anniversary='${anniversary}', latlng='${latlng}' WHERE guid='${guid}'`), function (error2, results2) {
                    if (error2) throw error2;
                    if(!!results2?.affectedRows) {
                        response200(res, `Contact ${name} updated!`, { guid, name, gender, numbers, photo: uploadedpath, emails, dob, anniversary, latlng });
                    }
                });
            });
        } else {
            const guid = generateGuid();
            const { name, gender, numbers, photo, emails, dob, anniversary, latlng="" } = req.body;
            let uploadedpath = '';

            if(photo && photo !== '' && isBase64(photo)) {
                uploadedpath = `assets/uploads/contacts/${guid}.png`;
                fs.writeFileSync(uploadedpath, new Buffer.from(photo?.replace(/^data:image\/\w+;base64,/, ""), 'base64'));
            }

            mysqlConnection.query(QUERY.ADD_CONTACT(`(guid,name,gender,numbers,photo,emails,dob,anniversary,latlng) VALUES ('${guid}','${name}','${gender}','${JSON.stringify(numbers)}','${uploadedpath.replace('assets/uploads/contacts','')}','${JSON.stringify(emails)}','${dob}','${anniversary}','${latlng}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    response200(res, `Contact ${name} created!`, { guid, name, gender, numbers, photo: uploadedpath, emails, dob, anniversary, latlng });
                }
            });
        }
    });
});

// remove contact route
RouteContacts.delete('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        if(!guid) {
            response401(res, `Please check request.`);
        } else {
            mysqlConnection.query(QUERY.GET_CONTACT(guid), function (error, results) {
                if (error) throw error;
                const [contact] = results;
                const { guid, name } = contact;
                mysqlConnection.query(QUERY.DELETE_CONTACT(guid), function (error, result) {
                    if (error) throw error;
                    if(!!result?.affectedRows) {
                        response200(res, `Contact ${name} deleted!`, { guid, name });
                    }
                });
            });
        }
    });
});

module.exports = RouteContacts
