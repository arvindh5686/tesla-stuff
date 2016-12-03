'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const optionAPI = require('./option-api');

const port = process.env.EXPOSED_PORT || 8000;
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

server.get('/options/:model', optionAPI);

server.listen(port);

module.exports = server;
