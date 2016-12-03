'use strict';
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const database = require('../database');
let url = "http://localhost:8000/options";

function mergeData(req, res) {
  console.log("test");
  let promises = [];

  promises.push(database.fetchData());
  promises.push(request(url + '/ms'));
  promises.push(request(url + '/mx'));


  Promise.all(promises)
          .then(result => {
            const dbResults = result[0];
            let mapModelPrice = {};
            dbResults.forEach(elem => {
              let config = elem.configuration;
              let modelType = elem.model;
              let eachModel = config.split(";");
              eachModel.forEach(modelInfo => {
                  let info = modelInfo.split("|");
                  let modelName = info[0];
                  let modelPrice = info[2];
                  mapModelPrice[modelType + modelName] = modelPrice;
              })
            })

            let modelMs = JSON.parse(result[1].body);
            let modelMx = JSON.parse(result[2].body);

            for(let key in modelMs.options) {
              modelMs.options[key].price = mapModelPrice[modelMs.model + key];
            }

            for(let key in modelMx.options) {
              modelMx.options[key].price = mapModelPrice[modelMx.model + key];
            }

            console.log(req);
            if (req.body.model === 'ms') {
                res.send(modelMs);
            } else if (req.body.model === 'mx') {
                res.send(modelMx);
            } else {
              res.send(JSON.stringify(modelMs) + ',' + JSON.stringify(modelMx));
            }
          });
}

// model: 'ms',
// modelName: 'Model S',
// options: {
//     AAAA: {
//         code: 'AAAA',
//         price: 0,
//         price_indicator: 'Included',
//         name: 'AAAA'
//     },
//     BBBB: {
//         code: 'BBBB',
//         price: 0,
//         price_indicator: 'Included',
//         name: 'Garage Door Opener'
//     },
//     CCCC: {
module.exports = mergeData;
