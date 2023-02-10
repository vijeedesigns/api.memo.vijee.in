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