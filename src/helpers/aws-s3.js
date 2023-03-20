const aws = require('aws-sdk');

aws.config.setPromisesDependency();
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});

const s3 = new aws.S3();

const bucket = 'memo-vijeesh';

module.exports = { s3, bucket };