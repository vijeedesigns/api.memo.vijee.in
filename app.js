const express = require('express');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const server = express();

// Set up Global configuration access
dotenv.config();

server.use(cors());
server.use(bodyParser.json());
server.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

server.get('/', (req, res) => {
    res.send(`<div>
        <div>Hello!</div>
        <div>Welcome to memo.vijee.in API.</div>
    </div>`);
})

const RouteAuth = require('./src/routes/route-auth');
server.use('/auth', RouteAuth);

const RouteUsers = require('./src/routes/route-users');
server.use('/users', RouteUsers);

const RouteExpenses = require('./src/routes/route-expenses');
server.use('/expenses', RouteExpenses);

const RouteEvents = require('./src/routes/route-events');
server.use('/events', RouteEvents);

const RouteTransactions = require('./src/routes/route-transactions');
server.use('/transactions', RouteTransactions);

const RouteDues = require('./src/routes/route-dues');
server.use('/dues', RouteDues);

const RouteImage = require('./src/routes/route-image');
server.use('/image', RouteImage);

const RouteCompanies = require('./src/routes/route-companies');
server.use('/companies', RouteCompanies);

const RouteLocker = require('./src/routes/route-locker');
server.use('/locker', RouteLocker);

const RouteUploads = require('./src/routes/route-uploads');
server.use('/uploads', RouteUploads);

const RoutePayslips = require('./src/routes/route-payslips');
server.use('/payslips', RoutePayslips);

server.listen(process.env.PORT);