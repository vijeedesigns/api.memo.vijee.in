const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send(`<div>
        <div>Hello!</div>
        <div>Welcome to memo.vijee.in API.</div>
    </div>`);
})