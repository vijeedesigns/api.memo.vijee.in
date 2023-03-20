require('../config');
const express = require('express');
const RoutePayslips = express.Router();
const { response200, response403 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');

const { s3, bucket } = require('../helpers/aws-s3');

RoutePayslips.get('/', (req, res) => {
    validateTokenThen(req, res, async () => {
        try {
            const response = await s3.listObjectsV2({
                Bucket: bucket,
                Prefix: 'payslips'
            }).promise();

            const result = response?.Contents
            .filter(item => item?.Key.split('/')[1] && item?.Key.split('/')[1]!=='')
            .map(item => ({guid: item?.ETag.replace(/"/g, ''), key: `${process.env.S3_BUCKET}/${item?.Key}`, lastModified: item?.LastModified, size: item?.Size}))
            .sort((a,b)=>b.key-a.key).reverse();

            response200(res, 'File list', { result });
        } catch (err) {
            response403(res, 'No files');
        }
    });
});

module.exports = RoutePayslips;