require('../config');
const express = require('express');
const RouteUploads = express.Router();
const EventModel = require('../models/model-event');
const TaskModel = require('../models/model-task');
const { response200, response403 } = require('../helpers/responses');
const { validateTokenThen } = require('../helpers/jwt');
const { generateGuid } = require('../utils');

// list uploads route
RouteUploads.get('/get-list', (req, res) => {
    validateTokenThen(req, res, async () => {
        try {
            const eventData = EventModel.find({ uploads: { $exists: true, $ne: [] } }).exec();
            const taskData = TaskModel.find({ uploads: { $exists: true, $ne: [] } }).exec();

            Promise.all([eventData, taskData]).then(values => {
                const linked = [];
                values.forEach(i => linked.push(...i));
                const linkedFiles = [];
                linked.forEach(item => {
                    linkedFiles.push(...item?.uploads);
                });
                const notLinkedFiles = []; //result.filter(item => !linkedFiles.includes(item));
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

module.exports = RouteUploads;
