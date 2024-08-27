# poke-cards-api

## Pokemon Cards API (v1) :

After clone the project,

run : `npm install`

to install all the dependencies.

## Setup PostgreSQL database :

Make sure to hava docker installed on your machine.

run: `docker-compose up -d`

this will create the image, run the container in detached mode.

After this you should see a Docker container running with PostgreSQL database set up with `pokecards` DB and `cards` table created and populated with data with port 5432 opened.

Now lets compile and run the app :

## Compile and run the API :

IMPORTANT : make sure you have te environment variables set up, check `example.env` file to know which variables you should set up.

run `npm run build && npm run start`

After should be running on "http://localhost:<4000 or the one specified at PORT environment variable>/api/v1/cards"

## Dev

IMPORTANT : copy `example.env` as `.env` in order to have set all the environment variables set up.

To run and work in dev mode, use the command :

`npm run dev`

will auto compile and run the app after every update on the codebase.

## Documentation :

access to whole Swagger documentation page on :

http://localhost:4000/api/v1/cards/docs/
