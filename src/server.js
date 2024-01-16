//server configuration happens in server.js

const express = required('express');

// make a server instance
const app = express();

app.get("/", (request, response)=>{
    response.json({
        message: "Hello world"
    });
});