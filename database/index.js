'use strict';

const Sequelize = require('sequelize');
const Rx = require('rxjs');
const configStrings = require('./configStrings');

let sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_ENDPOINT,
        port: process.env.DATABASE_PORT,
        dialect: 'mysql',
        logging: false
    }
);

let configString = sequelize.import(__dirname + '/configString');
module.exports.configString = configString;

checkConnection()
    .subscribe(logSuccess, logFailure);

function checkConnection() {
    let attempts = 0;
    return Rx.Observable.fromPromise(authorize())
        .retry(5);

    function authorize() {
        console.log('Database connection attempt ' + ++attempts);
        return sequelize.authenticate();
    }
}

function fetchData() {
  return sequelize.query("SELECT * FROM `Config_String`", { type: sequelize.QueryTypes.SELECT})
  .then(function(configString) {
    return configString;
  })
}

function logSuccess() {
    console.log('Database connection established successfully.');
    sequelize.sync().then(() => {
        configStrings.map(config => {
            configString.findOrCreate({
                where: {
                    configuration: config.configuration,
                    model: config.model
                }
            });
            return config;
        });
    });
}

function logFailure(err) {
    console.trace(err);
    console.warn('Unable to connect to the database.');
}

module.exports.fetchData = fetchData;
