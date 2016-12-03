'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const optionAPI = require('./option-api');
const mergeData = require('./test-work');

const port = process.env.EXPOSED_PORT || 8000;
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

server.get('/options/:model', optionAPI);

server.get('/model/data', mergeData);

server.listen(port);

module.exports = server;
