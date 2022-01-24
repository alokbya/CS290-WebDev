'use strict';

const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file 'stocks.js'
const stocks = require('./stocks.js').stocks;

const express = require("express");
const app = express();


app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
// Note: Don't add or change anything above this line.

// Add your code here
app.get("/", (req, res) => {
    res.send("./index.html");
})




// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});