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

// Return stock object based on search criteria
// This function assumes all "price" values in a stock object are of type: number
const findStockByPrice = (criteria) => {
    switch(criteria) {
        case "low":
            return stocks.reduce((prev, curr) => {
                return prev.price <= curr.price ? prev : curr;
            });
        default:
            return stocks.reduce((prev, curr) => {
                return curr.price >= prev.price ? curr : prev;
            });
    }
}

// Request handlers
// [GET] Root page (home: index.html)
app.get("/", (req, res) => {
    res.send("./index.html");
})

// [POST] Order endpoint for submitting stock purchase order
app.post("/order", (req, res) => {
    stocks.forEach((obj) => {
        if (obj.symbol === req.body.ticker) {
            let response = `You placed an order to buy ${req.body.quantity} stocks of ${obj.company} (${obj.symbol}). ` +
            `The price of one stock is \$${obj.price} ` + 
            `and the total price for this order is \$${Math.round(obj.price * req.body.quantity * 100) / 100}.`;
            res.send(response);
        }
    });

    res.send("Error processing your order.");
});

// [GET] Search endpoint for finding stock with matching criteria
app.get("/search", (req, res) => {
    res.send(findStockByPrice(req.query.criteria));
;})

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});