require('../config');
const express = require('express');
const RouteAncestry = express.Router();
const AncestryModel = require('../models/model-ancestry');
const { generateGuid } = require('../utils');
const { response200 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const fs = require('fs');
const path = require("path");

// list ancestry route
RouteAncestry.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        AncestryModel.find({}).exec((err, data) => {
            if(err) console.log(err);
            response200(res, data?.length ? 'Ancestry list' : 'No ancestry', { data });
        });
    });
});

// upload ancestry route
RouteAncestry.post('/upload-profile-image', (req, res) => {
    validateTokenThen(req, res, () => {
        const filename = path.join(`${appRoot}/assets/uploads/ancestry`, req?.body?.guid + '.png');
        fs.writeFileSync(filename, new Buffer.from(req?.body?.image?.replace(/^data:image\/\w+;base64,/, ""), 'base64'));
        response200(res, 'Profile picture updated', { data: filename });
    });
});

// add ancestry route
RouteAncestry.post('/add', (req, res) => {
    validateTokenThen(req, res, () => {
        const successList = [];
        const errorList = [];
        req?.body?.forEach(body => {            
            const { guid, name, familyName, gender, parents, spouse, children, profileImage } = body;
            const fields = { guid, name, familyName, gender, parents, spouse, children, profileImage };
            AncestryModel.findOne({ guid }, (err, data) => {
                if(err) throw err;
                if(data) {
                    AncestryModel.updateOne({ guid }, { $set: { ...fields } }, (err, docs) => {
                        if (err){
                            console.log(err)
                        }
                        else {
                            successList.push({ guid, ...fields });
                        }
                    });
                } else {
                    AncestryModel.find({ ...fields }, (err, data) => {
                        if(err) throw err;
                        if(data?.length) {
                            errorList.push({error: `Person ${name} exists`});
                        } else {
                            AncestryModel.create({ guid: generateGuid(), ...fields }, (e, d) => {
                                successList.push(d);
                            });
                        }
                    });
                }
            });
        });
        response200(res, `Ancestry API response`, { data: {successList, errorList} });
    });
});

// remove company route
RouteAncestry.post('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid } = req.body;
        AncestryModel.deleteOne({ guid }, (err, data) => {
            response200(res, 'Ancestry item deleted', { data: { guid } });
        })
    });
});

module.exports = RouteAncestry
