'use strict';

// import the express package
const express = require('express');
// create express application
const app = express();
// define port number
const PORT = 3000;

// define root endpoint, return "Hello World!" string
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// start server and listen for HTTP requests on port=PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
