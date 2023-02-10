require('../config');
const express = require('express');
const RouteUploads = express.Router();
const EventModel = require('../models/model-event');
const TaskModel = require('../models/model-task');
const { response200 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { generateGuid } = require('../utils');
const fs = require('fs');
const { uploadPath } = require('../constants');

// list uploads route
RouteUploads.get('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const eventData = EventModel.find({ uploads: { $exists: true, $ne: [] } }).exec();
        const taskData = TaskModel.find({ uploads: { $exists: true, $ne: [] } }).exec();

        const files = fs.readdirSync(uploadPath);

        Promise.all([eventData, taskData]).then(values => {
            const linked = [];
            values.forEach(i => linked.push(...i));
            const linkedFiles = [];
            linked.forEach(item => {
                linkedFiles.push(...item?.uploads);
            });
            const notLinkedFiles = files.filter(item => !linkedFiles.includes(item));
            const nonLinked = notLinkedFiles?.length ? [{
                guid: generateGuid(),
                uploads: notLinkedFiles
            }] : [];
            response200(res, linked?.length || nonLinked?.length ? 'File list' : 'No files', { linked, nonLinked });
        });
    });
});

RouteUploads.delete('/', (req, res) => {
    validateTokenThen(req, res, () => {
        const file = req?.body?.file;
        fs.unlink(uploadPath+file, (err) => {
            if(err) throw err;
            response200(res, 'File deleted', { file });
        });
    });
});

module.exports = RouteUploads