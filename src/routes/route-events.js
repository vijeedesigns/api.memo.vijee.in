const db = require('../config');
const express = require('express');
const RouteEvents = express.Router();
const EventModel = require('../models/model-event');
const TaskModel = require('../models/model-task');
const { response200 } = require('../helpers/responses');
const { generateGuid, prePad } = require('../utils');
const { validateTokenThen } = require('../helpers/jwt');
const { eventTypes } = require('../constants');

const REPEAT = {
    NO_REPEAT: 0,
    SELECT_DAYS: 1,
    WEEKLY: 2,
    MONTHLY: 3,
    ANNUALLY: 4
}

// list events route
RouteEvents.post('/', (req, res) => {
    validateTokenThen(req, res, async () => {
        const paramStartDate = new Date(req.body.startDate);
        const paramEndDate = new Date(req.body.endDate);
        const daysBetween = Math.round((paramEndDate - paramStartDate) / (1000 * 60 * 60 * 24)) + 1;
        let daysString = [];
        for(let i=0; i<daysBetween; i++) {
            let dt = new Date(req.body.startDate);
            dt.setDate((dt.getDate() + i) - 1);
            daysString.push(prePad(dt.getMonth()+1) + prePad(dt.getDate()));
        }

        const eventsFilter = req.body?.eventsFilter !== '' && req.body?.eventsFilter?.split(',') || [];
        const companiesFilter = req.body?.companiesFilter !== '' && req.body?.companiesFilter?.split(',') || [];

        const noRepeatEvents = { repeat: REPEAT.NO_REPEAT, date: { $gte: paramStartDate, $lte: paramEndDate } };
        const selectedDaysEvents = { repeat: REPEAT.SELECT_DAYS, date: { $lt: paramEndDate }, endDate: { $gt: paramStartDate } };
        const overTimeEvents = { date: { $lt: paramEndDate }, expireOn: { $gt: paramStartDate } };
        const yearlyEvents = () => {
            return {
                repeat: REPEAT.ANNUALLY,
                year: { $lte: Math.min(paramStartDate.getFullYear(), paramEndDate.getFullYear()) },
                dayMonthDate: { $in: daysString }
            }
        }

        const aggregate = [{
            $project: {
                guid: '$guid',
                type: '$type',
                date: '$date',
                dateNumber: { $toInt: { $dateToString: { format: "%Y%m%d", date: "$date"} } },
                dayMonthDate: { $dateToString: { format: "%m%d", date: "$date"} },
                endDate: { $cond: [ '$endDate', '$endDate', new Date() ] },
                allDay: '$allDay',
                leaveType: '$leaveType',
                name: '$name',
                time: '$time',
                duration: '$duration',
                company: '$company',
                repeat: '$repeat',
                description: '$description',
                repeatDays: '$repeatDays',
                exceptionDates: '$exceptionDates',
                interviewStatus: '$interviewStatus',
                uploads: '$uploads',
                year: { $year: "$date" },
                month: { $month: "$date" },
                day: { $dayOfMonth: "$date" },
                expireOn: {
                    $toDate: {
                        $add: [
                            { $toLong: "$date" },
                            { $multiply: [
                                { $add : [ '$time', '$duration' ] },
                                60000
                            ]},
                        ],
                    },
                },
            }
        },{
            $match: {
                $or: [noRepeatEvents, selectedDaysEvents, overTimeEvents, yearlyEvents()],
                type: { $in: eventsFilter }, 
                company: { $in: [...companiesFilter, ''] }
            }
        }];

        const eventData = EventModel.aggregate(aggregate).exec();
        const taskData = TaskModel.aggregate(aggregate).exec();

        // // v2 Events and Tasks

        // const v2AllEvents = await EventModel.find({});
        // const v2AllTasks = await TaskModel.find({});
        
        // const v2YearlyEvents = v2AllEvents.filter(ev => {
        //     const repeatCheck = ev.repeat === REPEAT.ANNUALLY;
        //     const evDate = new Date(ev.date);
        //     const thisDateMonth = (prePad(evDate.getMonth()+1) + prePad(evDate.getDate()));
        //     const daysCheck = daysString.includes(thisDateMonth);
        //     const yearCheck = evDate.getFullYear() <= paramStartDate.getFullYear();    
        //     daysCheck && console.log("thisDateMonth ", thisDateMonth, ev.name);        
        //     return repeatCheck && daysCheck && yearCheck;
        // });

        // const v2TasksInDateRange = v2AllTasks.filter(ev => {
        //     const evDate = new Date(ev.date);
        //     const paramStartDateTime = paramStartDate.getTime();
        //     const paramEndDateTime = paramEndDate.getTime();
        //     const inDateRangeCheck = evDate.getTime() >= paramStartDateTime && evDate.getTime() <= paramEndDateTime;
        //     return inDateRangeCheck;
        // });

        // const v2Events = [...v2YearlyEvents, ...v2TasksInDateRange];

        Promise.all([eventData, taskData]).then(values => {
            const events = [];
            values.forEach(i => events.push(...i));
            response200(res, events?.length ? 'Event list' : 'No events', { events });
        });
    });
});

RouteEvents.get('/type/:type', (req, res) => {
    validateTokenThen(req, res, () => {
        const type = req.params.type;

        const aggregate = [{
            $project: {
                guid: '$guid',
                type: '$type',
                dt: '$date',
                name: '$name',
                company: '$company',
                repeat: '$repeat',
                description: '$description',
                uploads: '$uploads',
                year: { $year: "$date" },
                month: { $month: "$date" },
                date: { $dayOfMonth: "$date" },
                day: { $dayOfWeek: "$date" }
            }
        },{
            $match: { type }
        }];

        const eventData = EventModel.aggregate(aggregate).exec();
        const taskData = TaskModel.aggregate(aggregate).exec();

        Promise.all([eventData, taskData]).then(values => {
            // console.log("values ", values);
            const events = [];
            values.forEach(i => events.push(...i));
            response200(res, events?.length ? 'Event list' : 'No events', { events });
        });
    });
});

// list today events route
RouteEvents.get('/today', (req, res) => {
    validateTokenThen(req, res, () => {
        const d = new Date();

        const noRepeatEvents = {
            repeat: REPEAT.NO_REPEAT,
            year: { $eq: d.getFullYear() },
            month: { $eq: d.getMonth()+1 },
            day: { $eq: d.getDate()-1 }
        };
        const aggregate = [{
            $project: {
                guid: '$guid',
                type: '$type',
                date: '$date',
                allDay: '$allDay',
                leaveType: '$leaveType',
                name: '$name',
                time: '$time',
                duration: '$duration',
                company: '$company',
                repeat: '$repeat',
                description: '$description',
                repeatDays: '$repeatDays',
                exceptionDates: '$exceptionDates',
                interviewStatus: '$interviewStatus',
                uploads: '$uploads',
                year: { $year: "$date" },
                month: { $month: "$date" },
                day: { $dayOfMonth: "$date" },
                expireOn: {
                    $toDate: {
                        $add: [
                            { $toLong: "$date" },
                            { $multiply: [
                                { $add : [ '$time', '$duration' ] },
                                60000
                            ]},
                        ],
                    },
                },
            }
        },{
            $match: {
                $or: [noRepeatEvents]
            }
        }];

        const eventData = EventModel.aggregate(aggregate).exec();
        const taskData = TaskModel.aggregate(aggregate).exec();

        Promise.all([eventData, taskData]).then(values => {
            // console.log("values ", values);
            const events = [];
            values.forEach(i => events.push(...i));
            response200(res, events?.length ? 'Event list' : 'No events', { events });
        });
    });
});

// add events route
RouteEvents.post('/add', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid=null, type, date, endDate, allDay, leaveType, name, time, duration, company, repeat, repeatDays, exceptionDates, description, interviewStatus, uploads=[] } = req.body;
        const fields = { type, date, endDate, allDay, leaveType, name, time, duration, company, repeat, repeatDays, exceptionDates, description, interviewStatus, uploads };

        const addEditFn = (model, messageOnAdd, messageOnEdit) => {
            model.findOne({ guid }, (err, data) => {
                if(data) {
                    model.updateOne({ guid }, { $set: { ...fields } }, (err, docs) => {
                        if (err){
                            console.log(err)
                        }
                        else {
                            response200(res, messageOnEdit, { data: { guid, ...fields } });
                        }
                    });
                } else {
                    model.create({ guid: generateGuid(), ...fields }, (e, d) => {
                        response200(res, messageOnAdd, { data: d });
                    });
                }
            });
        }

        switch(type) {
            case 'TASK' :
                addEditFn(TaskModel, `Task added`, `Task updated`);
            break;
            default :        
                addEditFn(EventModel, `Event added`, `Event updated`);
            break;
        }
    });
});

// remove event route
RouteEvents.post('/remove', (req, res) => {
    validateTokenThen(req, res, () => {
        const { guid, type } = req.body;

        const removeFn = (model) => {
            model.deleteOne({ guid }, (err, data) => {
                response200(res, 'Event/Task deleted', { data: { guid } });
            })
        }

        switch(type) {
            case 'TASK' :
                removeFn(TaskModel);
            break;
            default :        
                removeFn(EventModel);
            break;
        }
    });
});

// search events route
RouteEvents.get('/search/:query', (req, res) => {
    validateTokenThen(req, res, () => {
        const query = req.params.query;
        const search = { "$regex": query, "$options": "i" };

        const eventData = EventModel.find({ $or: [{name: search}, {description: search}, {type: search}] }).exec();
        const taskData = TaskModel.find({ $or: [{name: search}, {description: search}, {type: search}] }).exec();

        Promise.all([eventData, taskData]).then(values => {
            const events = [];
            values.forEach(i => events.push(...i));
            response200(res, events?.length ? 'Search results' : 'No results', { data: events.slice(0, 10) });
        });
    });
});

// get event types
RouteEvents.get('/types', (req, res) => {
    response200(res, 'Event types', { data: eventTypes });
})

module.exports = RouteEvents;
