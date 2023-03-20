require('../config');
const express = require('express');
const RouteLocker = express.Router();
const NoteModel = require('../models/model-note');
const { generateGuid } = require('../utils');
const { response200, response401 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

// list locker route
RouteLocker.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        NoteModel.find({}, (err, data) => {
            if(err) console.log(err);
            response200(res, data?.length ? 'Note list' : 'No notes', { data });
        });
    });
});

RouteLocker.post('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, title, content } = req.body;
        NoteModel.find({ guid }, (err, data) => {
            if(data?.length) {
                NoteModel.updateOne({ guid }, { $set: { title, content } }, (err, docs) => {
                    if (err){
                        response401(res, err);
                    }
                    else {
                        response200(res, `Note updated`, { data: { guid, title, content } });
                    }
                });
            } else {
                NoteModel.create({ guid: generateGuid(), title, content }, (e, d) => {
                    response200(res, `Note added`, { data: d });
                });
            }
        });
    });
});

module.exports = RouteLocker
