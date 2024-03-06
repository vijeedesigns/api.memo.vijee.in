require('../config');
const express = require('express');
const RoutePhotos = express.Router();
const { response200 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const fs = require('fs');
const path = require('path');
const mysqlConnection = require('../db-connection');
const { QUERY } = require('../query-constants');

// list photos route
RoutePhotos.get('/get-photos', (req, res) => {
    validateTokenThen(req, res, async () => {
        mysqlConnection.query(QUERY.GET_PHOTOS(), function (error, results) {
            if (error) throw error;
            const result = results?.map(item => {
                const exifdata = JSON.parse(item?.exifdata);
                return {
                    guid: item?.guid,
                    exifdata: {
                        DateTime: exifdata?.DateTime
                    },
                    latitude: parseFloat(item?.latitude),
                    longitude: parseFloat(item?.longitude),
                    name: item?.name,
                    place: item?.place,
                    path: item?.path,
                    relativePath: "photos/" + item?.name
                }
            });
            response200(res, `Photo list`, {result});
        });      
    }); 
});

// get photo details route
RoutePhotos.get('/details/:viewid', (req, res) => {
    const guid = req.params.viewid;
    validateTokenThen(req, res, async () => {
        mysqlConnection.query(QUERY.GET_PHOTO(guid), function (error, results) {
            if (error) throw error;
            const [photo] = results;
            response200(res, `Photo details`, { data: { ...photo, exifdata: JSON.parse(photo?.exifdata) } });
        });     
    }); 
});

// upload photos route
RoutePhotos.post('/add-edit', (req, res) => {
    validateTokenThen(req, res, () => {        
        const successList = [];
        const errorList = [];
        const files = req?.body;
        files.forEach(file => {
            const { exifdata, guid, latitude, longitude, name, place, resizedImage } = file;
            const filename = path.join(`${appRoot}/assets/uploads/photos`, name);
            fs.writeFileSync(filename, new Buffer.from(resizedImage?.replace(/^data:image\/\w+;base64,/, ""), 'base64'));

            mysqlConnection.query(QUERY.ADD_PHOTO(`(guid, exifdata, latitude, longitude, name, place, path) VALUES ('${guid}','${JSON.stringify(exifdata)}','${latitude}','${longitude}','${name}','${place}','${filename}')`), function (error, results) {
                if (error) throw error;
                if(!!results?.affectedRows) {
                    successList.push({ guid, exifdata, latitude, longitude, name, place, path: filename });
                }
            });

            // PhotoModel.create({ guid, exifdata, latitude, longitude, name, place, path: filename }, (e, d) => {
            //     successList.push(d);
            // });
        });
        response200(res, 'Photo uploaded!', { data: {successList, errorList}});
    });
});

module.exports = RoutePhotos;
