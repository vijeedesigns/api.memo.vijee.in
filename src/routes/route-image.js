require('../config');
const express = require('express');
const RouteImage = express.Router();
const { response200, response403 } = require('../helpers/responses');
const Jimp = require("jimp");
const { imageNotFound } = require('../constants');
const multer = require('multer');
const path = require("path");
const { diskStorage } = require('multer');

const readDummyImage = (res) => {
    const buff = Buffer.from(imageNotFound, 'base64');
    Jimp.read(buff, (err, image) => {
        if (err) throw err;
        const mime = image.getMIME();
        image.getBuffer(mime, (er, buffer) => {
            if (er) throw er;
            res.end(buffer);
        });
    });
}

const storage = diskStorage({
    destination: function (req, file, callback) {
        return callback(null, path.join(`${appRoot}/assets/uploads/events`));
    },
    filename: function (req, file, callback) {
        return callback(null, new Date().getTime() + '-' + file.originalname);
    }
});
const upload = multer({ storage }).array("files", 12);

// get resized images
RouteImage.get('/', (req, res) => {
    const width = Number(req.query?.w) || 0;
    const height = Number(req.query?.h) || 0;
    const ratio = Number(width/height);
    const imgPath = `${appRoot}/assets/uploads/${req.query.path}`;
    const acceptableExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    const extension = req.query.path?.split('.').pop();
    if(acceptableExtensions.includes(extension.toLowerCase())) {
        Jimp.read(imgPath, (err, image) => {
            if (err) readDummyImage(res);
            if(image) {
                const w = image?.bitmap?.width || 50; // the width of the image
                const h = image?.bitmap?.height || 50; // the height of the image
                const r = w/h || 1; // the ratio of the image
                const nw = r>ratio ? width : height*r;
                const nh = r>ratio ? width/r : height;
                const jimpImg = width && height ? image?.resize(nw, nh) : image;
                const mime = jimpImg.getMIME();
                jimpImg.getBuffer(mime, (er, buffer) => {
                    if (er) throw er;
                    res.end(buffer);
                });
            } else {
                readDummyImage(res);
            }
        });
    } else {
        readDummyImage(res);
    }
});

// get resized square image
RouteImage.get('/square', (req, res) => {
    const radius = Number(req.query?.s) || 30;
    const imgPath = `${appRoot}/assets/uploads/${req.query.path}`;
    const acceptableExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    const extension = req.query.path?.split('.').pop();
    if(acceptableExtensions.includes(extension.toLowerCase())) {
        Jimp.read(imgPath, (err, image) => {
            if (err) readDummyImage(res);
            if(image) {
                const w = image?.bitmap?.width || 50; // the width of the image
                const h = image?.bitmap?.height || 50; // the height of the image
                const min = Math.min(w,h);
                const ratio = min/radius;
                const toWidth = w/ratio;
                const toHeight = h/ratio;
                const newMin = Math.min(toWidth,toHeight);
                const jimpImg = image?.resize(toWidth, toHeight)?.crop((toWidth/2)-(newMin/2), (toHeight/2)-(newMin/2), newMin, newMin);
                const mime = jimpImg.getMIME();
                jimpImg.getBuffer(mime, (er, buffer) => {
                    if (er) throw er;
                    res.end(buffer);
                });
            } else {
                readDummyImage(res);
            }
        });
    } else {
        readDummyImage(res);
    }
});

RouteImage.post('/upload', (req, res) => upload(req, res, err => {
    if(err) {
        response403(res, 'Please choose a file');
    }
    const { files } = req;
    response200(res, 'File list', { data: { success: true, status: 200, message: 'File uploaded', files } });
}));

module.exports = RouteImage;
