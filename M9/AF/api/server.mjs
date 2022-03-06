
// Create - POST /exercises
// Read - GET /exercises
// Read - GET /exercises/:id
// Delete - DELETE /exercises/:id

// Assumptions
// - requests have valid data
// - response code must be 500 in case of error, response body must have JSON object with information about the error (exception info)
// - send 404 instead of 500 if delete throws exception

import express from 'express';
const app = express();
const PORT = 3000;

// Middleware
// Validate session id for authentication


// Controller

/*
    * Create
*/
app.post("/exercises", (req, res) => {
    // create exercise in db
});

/*
    * Read all
*/
app.get("/exercises", (req, res) => {
    // read all exercises in db
});

/*
    * Read by id
*/
app.get("/exercises/:id", (req, res) => {
    // read single exercise by id
});

/*
    * Update by id
*/
app.get("/exercises/:id", (req, res) => {
    // update by id
});

/*
    * Delete by id
*/
app.delete("/exercises/:id", (req, res) => {
    // delete by id
});


/*
    * Listen for incoming requests on PORT
*/
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});