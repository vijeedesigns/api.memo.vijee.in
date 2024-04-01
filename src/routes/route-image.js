require('../config');
const express = require('express');
const RouteImage = express.Router();
const { response200, response403 } = require('../helpers/responses');
const { imageNotFound } = require('../constants');
const multer = require('multer');
const path = require("path");
const { diskStorage } = require('multer');
const sharp = require('sharp');
const mime = require('mime-types');

const readDummyImage = (res) => {
    const buff = Buffer.from(imageNotFound, 'base64');
    const image = sharp(buff);
    const resizedImage = image.resize(100, 100);
    resizedImage.toBuffer((err, info) => {
        if (err) console.log(err);
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(info);
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
    const square = Number(req.query?.s) || 0;
    const width = Number(req.query?.w) || 0;
    const height = Number(req.query?.h) || 0;
    const imgPath = `${appRoot}/assets/uploads/${req.query.path}`;
    const acceptableExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    const extension = req.query.path?.split('.').pop();
    if(acceptableExtensions.includes(extension.toLowerCase())) {
        const image = sharp(imgPath);
        const mimeType = mime.lookup(imgPath);
        const resizedImage = square ? image.resize(square, square) : image.resize(width, height);
        resizedImage.toBuffer((err, info) => {
            if (err) {
                readDummyImage(res);
            } else {                
                res.setHeader('Content-Type', mimeType);
                res.end(info);
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
        const image = sharp(imgPath);
        const mimeType = mime.lookup(imgPath);
        const resizedImage = image.resize(radius, radius);
        resizedImage.toBuffer((err, info) => {
            if (err) {
                readDummyImage(res);
            } else {                
                res.setHeader('Content-Type', mimeType);
                res.end(info);
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

module.exports = { RouteImage, readDummyImage };
