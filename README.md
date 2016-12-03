# Tesla Node.js Developer Test

## What is Provided

You have been provided a compressed directory that contains a basic Node application setup and the Docker files to spin up a development environment, an API with one endpoint, and a database. To do this test you will need to have Docker and docker-compose installed.

## Initializing the Project

When you run `npm run develop` in the extracted project directory, all three environments will initialize and the project directory will be mounted to the application Docker container so that changes in the project directory will be available in the container for the watch task to rebuild. You will then have access to the `configString` model from the `database` connection and a JSON payload from the Node application, available at `http://localhost:8000/options/:model`.

## Completing the Task

Your task is to consume the API endpoint and pull the data from the database that corresponds to the API JSON, merge the two data sources, and expose the result as an endpoint from the Node server.The final, merged JSON must contain all elements from both the database vehicle configurations and API response. Where they conflict, prefer the database data over the API response. Additionally, you will need to expose an endpoint that receives a list of properties and returns all configurations from the database that contain those properties (a basic search API).

## Constraints

- Your work should happen in the `test-work` directory and your endpoint shoule be `/test-work/:model`. The only other file you need to modify in this project is `api.js` to add your endpoint to the routes.- This project does not transpile, so any ES6 features used must work with the Node 6.x version provided. Do not add a build step.
- Do not use anything other than Node.
- If the data in either source changes, that should be reflected in your exposed API (Bonus not withstanding)
- Do not use any third-party APIs

## Bonus
- Use RxJS or ES6 Promises to manage asychronicity
- Rather than executing database and API calls for every call to your API, cache the response for 5 minutes and only retrieve from the data source every 5 minutes.