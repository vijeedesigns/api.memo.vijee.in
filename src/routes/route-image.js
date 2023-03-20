require('../config');
const express = require('express');
const RouteImage = express.Router();
const { response200, response403 } = require('../helpers/responses');
const Jimp = require("jimp");
const { imageNotFound } = require('../constants');
const multer = require('multer');
const { memoryStorage } = require('multer');
// const exifr = require('exifr');

const { s3, bucket } = require('../helpers/aws-s3');

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

const storage = memoryStorage();
const upload = multer({ storage });

// async function getExif(imgPath) {
//     let output = await exifr.parse(imgPath)
//     console.log('exif', output);
// }

// get resized images
RouteImage.get('/:url/:width?/:height?', (req, res) => {
    const width = Number(req.params.width) || 0;
    const height = Number(req.params.height) || 0;
    const ratio = width/height;
    const imgPath = `${process.env.S3_BUCKET}/${req.params.url.split(',').join('/')}`;
    const acceptableExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    const extension = req.params.url.split('.').pop();
    if(acceptableExtensions.includes(extension.toLowerCase())) {
        // getExif(imgPath);
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

RouteImage.post('/upload', upload.single("image"), (req, res) => {
    try {
        const { file } = req;

        const name = file.originalname;
        const datetime = new Date().getTime();

        s3.upload({
            Bucket: bucket,
            Key: `uploads/${datetime}-${name}`,
            ContentType: file?.mimetype,
            Body: file.buffer
        }, (err, data) => {
            if(err) {
                response403(res, 'No file uploaded');
            }
            response200(res, 'File list', { data: { success: true, status: 200, message: 'File uploaded', file: data } });
        });
    } catch (err) {
        response403(res, 'Please choose a file');
    }
});

module.exports = RouteImage;