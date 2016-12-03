'use strict';

const options = require('./options');

module.exports = requestHandler;

function requestHandler(req, res) {
    if (req.params.model === 'mx') {
        res.send(options[1]);
    } else {
        res.send(options[0]);
    }
}
