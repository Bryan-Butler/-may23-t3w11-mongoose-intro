//server configuration happens in server.js

const express = require('express');

// make a server instance
const app = express();

app.use(express.json());

app.get("/", (request, response)=>{
    response.json({
        message: "Hello world"
    });
});

const PetRouter = require('./controllers/PetController');
app.use('./pets', PetRouter)

const SightingRouter = require('./controllers/SightingController');
app.use('/sightings', SightingRouter);

module.exports = {
    app
}