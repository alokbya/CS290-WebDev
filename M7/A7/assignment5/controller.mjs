// Import dependencies
import * as persons from './model.mjs';
import express, { response } from 'express';
import { findPerson } from './model.mjs';
const app = express();

const PORT = 3000;

// Global Constants (useless if deploying across multiple server instances)
let retReqNoParam = 0;      // retrieve request w/ params
let retReqWithParam = 0;    // retrieve request w/o query params
let retReqTotal = 0;        // total retrieve requests

// Helper Functions
const queryParamCount = (req) => {
    let count = 0;

    if (req.query.name != undefined) count+=1;
    if (req.query.age != undefined) count+=1;
    if (req.query.email != undefined) count+=1;
    if (req.query.phoneNumber != undefined) count+=1;
    if (req.query._id != undefined) count+=1;

    return count;
}

// Middleware functions
app.use('/retrieve', (req, res, next) => {
    const count = queryParamCount(req);
    if (count > 0) {
        retReqWithParam++;
    } else {
        retReqNoParam++;
    }
    retReqTotal++;

    if(retReqTotal == 10 || retReqTotal > 10 && retReqTotal % 10 == 0) {
        console.log(`Total retrieve requests: ${retReqTotal}`);
        console.log(`Retrieve requests with 0 parameters: ${retReqNoParam}`);
        console.log(`Retrieve requests with 1 or more query parameters: ${retReqWithParam}`);
    }
    next();
});

// Read query params
app.use(express.urlencoded({extended: true}));

// Endpoints
// GET
// Create person document
app.get('/create', (req, res) => {
    persons.createPerson(req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(person => {
            res.json(person);
        })
        .catch(error => {
            console.error(error);
            res.send("Request failed");
        });
});

// GET
// Retrieve (fetch) person document
app.get('/retrieve', (req, res) => {
    let filter = {};
    if (req.query.name != undefined) filter["name"] = req.query.name;
    if (req.query.age != undefined) filter["age"] = req.query.age;
    if (req.query.email != undefined) filter["email"] = req.query.email;
    if (req.query.phoneNumber != undefined) filter["phoneNumber"] = req.query.phoneNumber;
    if (req.query._id != undefined) filter["_id"] = req.query._id;
    
    persons.findPerson(filter, '', 0)
        .then(person => {
            res.send(person);
        })
        .catch(error => {
            console.error(error);
            res.send("Request failed");
        })
});

// GET
// Update person document
app.get('/update', (req, res) => {
    let condition = {"_id": req.query._id};
    let update = {};
    if (req.query.name != undefined) update["name"] = req.query.name;
    if (req.query.age != undefined) update["age"] = req.query.age;
    if (req.query.email != undefined) update["email"] = req.query.email;
    if (req.query.phoneNumber != undefined) update["phoneNumber"] = req.query.phoneNumber;

    persons.updatePerson(condition, update, {})
        .then(person => {
            if(person === null) {
                throw new Error("id not found");
            }
            res.send(`{"modifiedCount": 1 }`);
        })
        .catch(error => {
            console.error(error);
            res.send(`{"Error": "Not found"}`);
        });
});

// GET
// Delete person document
app.get('/delete', (req, res) => {
    if (req.query._id != undefined) {
        persons.deletePersonById(req.query._id)
            .then(result => {
                res.send(`{"deletedCount": ${result.deletedCount}}`);
            })
            .catch(error => {
                console.error(error);
                res.send("Request failed");
            })
    } else {
        let conditions = {}
        if (req.query.name != undefined) conditions["name"] = req.query.name;
        if (req.query.age != undefined) conditions["age"] = req.query.age;
        if (req.query.email != undefined) conditions["email"] = req.query.email;
        if (req.query.phoneNumber != undefined) conditions["phoneNumber"] = req.query.phoneNumber;

        persons.deletePersons(conditions)
            .then(result => {
                res.send(`{"deletedCount": ${result.deletedCount}}`);
            })
            .catch(error => {
                console.error(error);
                res.send("Request failed");
            });
    }
});

// Listen for requests on port:PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});