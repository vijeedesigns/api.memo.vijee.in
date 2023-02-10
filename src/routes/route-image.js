require('../config');
const express = require('express');
const RouteImage = express.Router();
const Jimp = require("jimp");
const { uploadPath, imageNotFound } = require('../constants');

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

// get resized images
RouteImage.get('/:url/:width?/:height?', (req, res) => {
    const width = Number(req.params.width) || 0;
    const height = Number(req.params.height) || 0;
    const ratio = width/height;
    const imgPath = `${uploadPath}${req.params.url}`;
    const acceptableExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    const extension = req.params.url.split('.').pop();
    if(acceptableExtensions.includes(extension.toLowerCase())) {
        Jimp.read(imgPath, (err, image) => {
            if (err) readDummyImage(res);
            if(image) {
                const w = image.bitmap.width; // the width of the image
                const h = image.bitmap.height; // the height of the image
                const r = w/h; // the ratio of the image
                const nw = r>ratio ? width : height*r;
                const nh = r>ratio ? width/r : height;
                const jimpImg = width && height ? image.resize(nw, nh) : image;
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

RouteImage.post('/upload', (req, res) => {
    const image = req.files.myFile;
    const name = image.name;
    const datetime = new Date().getTime();
    const path = `${uploadPath}${datetime}-${name}`;
    
    image.mv(path, (error) => {
        if(error) throw error;
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ data: { success: true, status: 200, message: 'File uploaded', file: `${datetime}-${name}` } }));
    });
});

module.exports = RouteImage;