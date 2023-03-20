require('../config');
const express = require('express');
const RouteUploads = express.Router();
const EventModel = require('../models/model-event');
const TaskModel = require('../models/model-task');
const { response200, response403 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { generateGuid } = require('../utils');

const { s3, bucket } = require('../helpers/aws-s3');

// list uploads route
RouteUploads.get('/', (req, res) => {
    validateTokenThen(req, res, async () => {
        try {
            const eventData = EventModel.find({ uploads: { $exists: true, $ne: [] } }).exec();
            const taskData = TaskModel.find({ uploads: { $exists: true, $ne: [] } }).exec();
            const response = await s3.listObjectsV2({
                Bucket: bucket,
                Prefix: 'uploads'
            }).promise();

            const result = response?.Contents
            .filter(item => item?.Key.split('/')[1] && item?.Key.split('/')[1]!=='')
            .map(item => (item?.Key.split('/')[1]))
            .sort((a,b)=>b.key-a.key);

            Promise.all([eventData, taskData]).then(values => {
                const linked = [];
                values.forEach(i => linked.push(...i));
                const linkedFiles = [];
                linked.forEach(item => {
                    linkedFiles.push(...item?.uploads);
                });
                const notLinkedFiles = result.filter(item => !linkedFiles.includes(item));
                const nonLinked = notLinkedFiles?.length ? [{
                    guid: generateGuid(),
                    uploads: notLinkedFiles
                }] : [];
                response200(res, linked?.length || nonLinked?.length ? 'File list' : 'No files', { linked, nonLinked });
            });
        } catch (err) {
            response403(res, 'No files');
        }        
    });
});

RouteUploads.delete('/', (req, res) => {
    validateTokenThen(req, res, async () => {
        const file = req?.body?.file;
        const params = {
            Bucket: bucket,
            Key: file
        }
        try {
            await s3.deleteObject(params).promise();
            response200(res, 'File deleted', { file: file.split('/').pop() });
        }
        catch (err) {
            response403(res, 'No file deleted');
        }
    });
});

module.exports = RouteUploads;